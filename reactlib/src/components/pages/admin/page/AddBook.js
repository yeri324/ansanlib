import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import "./AddBook.css";
import AdminHeader from '../common/AdminHeader';
import AdminSide from '../../admin/common/AdminSide';
import useAuth, { LOGIN_STATUS, ROLES } from '../../../hooks/useAuth';
import Auth from '../../../helpers/Auth';
import RedirectLogin from '../../../helpers/RedirectLogin';

const AddBook = ({ csrf = {} }) => {
    const { axios } = useAuth();
    const initialFormData = {
        id: '',
        isbn: '',
        title: '',
        author: '',
        publisher: '',
        pub_date: '',
        category_code: '',
        libName: '',
        bookDetail: '',
        count: '',
        status: 'AVAILABLE',
        book_img: 'null'
    };

    const initialErrors = {
        isbn: '',
        title: '',
        author: '',
        publisher: '',
        pub_date: '',
        category_code: '',
        libName: '',
        bookDetail: '',
        count: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState(initialErrors);
    const [selectedLibrary, setSelectedLibrary] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const libraries = {
        '상록구': [
            { name: '감골도서관' },
            { name: '반월도서관' },
            { name: '부곡도서관' },
            { name: '본오도서관' },
            { name: '상록수도서관' },
            { name: '상록어린이도서관' },
            { name: '성포도서관' },
            { name: '수암도서관' }
        ],
        '단원구': [
            { name: '관산도서관' },
            { name: '단원어린이도서관' },
            { name: '미디어도서관' },
            { name: '선부도서관' },
            { name: '원고잔도서관' }
        ],
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const handleFileChange = (e) => {
        const { files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            bookImg: files[0],
        }));

        if (files && files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target.result);
            };
            reader.readAsDataURL(files[0]);
        }
    };

    const handleImageCancel = () => {
        setFormData((prevData) => ({
            ...prevData,
            bookImg: null,
        }));
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleReset = () => {
        setFormData(initialFormData);
        setErrors(initialErrors);
        setSelectedLibrary('');
        setSelectedSection('');
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleLibraryChange = (e) => {
        setSelectedLibrary(e.target.value);
        setSelectedSection('');
        setFormData((prevData) => ({
            ...prevData,
            libName: '', // Clear libName when library changes
        }));
    };

    const handleSectionChange = (e) => {
        const selectedLib = libraries[selectedLibrary].find(lib => lib.name === e.target.value);
        setSelectedSection(e.target.value);
        setFormData((prevData) => ({
            ...prevData,
            libName: selectedLib ? selectedLib.name : '', // Set libName based on the selected section
        }));
    };

    const validate = () => {
        let tempErrors = { ...initialErrors };
        let isValid = true;

        if (!formData.isbn) {
            tempErrors.isbn = 'ISBN을 입력해주세요';
            isValid = false;
        }
        if (!formData.title) {
            tempErrors.title = '도서명을 입력해주세요';
            isValid = false;
        }
        if (!formData.author) {
            tempErrors.author = '저자를 입력해주세요';
            isValid = false;
        }
        if (!formData.publisher) {
            tempErrors.publisher = '출판사를 입력해주세요';
            isValid = false;
        }
        if (!formData.pub_date) {
            tempErrors.pub_date = '출판년도를 입력해주세요';
            isValid = false;
        }
        if (!formData.category_code) {
            tempErrors.category_code = '카테고리 코드를 입력해주세요';
            isValid = false;
        }
        if (!formData.libName) {
            tempErrors.libName = '소장 도서관을 선택해주세요';
            isValid = false;
        }
        if (!formData.bookDetail) {
            tempErrors.bookDetail = '상세 내용을 입력해주세요';
            isValid = false;
        }
        if (!formData.count || formData.count <= 0) {
            tempErrors.count = '도서 수량을 입력해주세요';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        // Check if the book already exists in the selected library
        try {
            const existsResponse = await axios.get('/api/admin/book/exists', {
                params: {
                    isbn: formData.isbn,
                    libName: formData.libName,
                },
            });

            if (existsResponse.data) {
                alert('해당 도서관에 소장 중입니다');
                return;
            }
        } catch (error) {
            console.error('Error checking book existence:', error);
            return;
        }

        const formDataCopy = {
            ...formData,
            pub_date: formData.pub_date ? formData.pub_date.toString() : '',
        };

        const data = new FormData();
        data.append('bookDto', new Blob([JSON.stringify(formDataCopy)], { type: 'application/json' }));

        if (formData.bookImg) {
            data.append('file', formData.bookImg);
        }

        try {
            const response = await axios.post(`/api/admin/book/new`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    [csrf.parameterName]: csrf.token,
                },
            });

            alert('도서가 성공적으로 등록되었습니다!');
           
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    };

    return (
        <div className="admin-page">
            <div className="admin-base">
                <AdminHeader />
                <AdminSide />
            </div>

            <main className="admin-addBook-main">
                <div className="admin-addBook-body">
                    <div className="admin-addBook-title">
                        <h2>도서 등록</h2>
                    </div>

                    <form className="admin-addBook-form" onSubmit={handleSubmit}>
                        <input type="hidden" name="id" value={formData.id} />
                        <input type="hidden" name="status" value="AVAILABLE" />

                        {imagePreview && (
                            <div className="form-group">
                                <img src={imagePreview} alt="미리보기" className="img-thumbnail" />
                                <button type="button" className="btn btn-outline-dark" onClick={handleImageCancel}>취소</button>
                            </div>
                        )}

                        <div id="admin-input-form" className="input-group mb-3">
                            <label id="admin-addBook-label" className="input-group-text">도서 표지</label>
                            <input
                                type="file"
                                className="form-control"
                                id="admin-addBook-input"
                                name="bookImgFile"
                                onChange={handleFileChange}
                                ref={fileInputRef}
                            />
                        </div>

                        <div id="admin-input-form" className="input-group mb-3">
                            <label id="admin-addBook-label" className="input-group-text">도서명</label>
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                id="admin-addBook-input"
                                placeholder="도서명을 입력해주세요"
                                value={formData.title}
                                onChange={handleChange}
                            />
                            {errors.title && <p className="text-danger">{errors.title}</p>}
                        </div>

                        <div id="admin-input-form" className="input-group mb-3">
                            <label id="admin-addBook-label" className="input-group-text">ISBN</label>
                            <input
                                type="text"
                                name="isbn"
                                className="form-control"
                                id="admin-addBook-input"
                                placeholder="ISBN을 입력해주세요"
                                value={formData.isbn}
                                onChange={handleChange}
                            />
                            {errors.isbn && <p className="text-danger">{errors.isbn}</p>}
                        </div>

                        <div id="admin-input-form" className="input-group mb-3">
                            <label id="admin-addBook-label" className="input-group-text">저자</label>
                            <input
                                type="text"
                                name="author"
                                className="form-control"
                                id="admin-addBook-input"
                                placeholder="저자를 입력해주세요"
                                value={formData.author}
                                onChange={handleChange}
                            />
                            {errors.author && <p className="text-danger">{errors.author}</p>}
                        </div>

                        <div id="admin-input-form" className="input-group mb-3">
                            <label id="admin-addBook-label" className="input-group-text">출판사</label>
                            <input
                                type="text"
                                name="publisher"
                                className="form-control"
                                id="admin-addBook-input"
                                placeholder="출판사를 입력해주세요"
                                value={formData.publisher}
                                onChange={handleChange}
                            />
                            {errors.publisher && <p className="text-danger">{errors.publisher}</p>}
                        </div>

                        <div id="admin-input-form" className="input-group mb-3">
                            <label id="admin-addBook-label" className="input-group-text">출판년도</label>
                            <input
                                type="text"
                                name="pub_date"
                                className="form-control"
                                id="admin-addBook-input"
                                placeholder="출판년도를 입력해주세요"
                                maxLength={4} // 최대 4글자로 제한
                                value={formData.pub_date}
                                onChange={handleChange}
                                onKeyPress={(e) => {
                                    if (!/[0-9]/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                            />
                            {errors.pub_date && <p className="text-danger">{errors.pub_date}</p>}
                        </div>


                        <div id="admin-input-form" className="input-group mb-3">
                            <label id="admin-addBook-label" className="input-group-text">카테고리코드</label>
                            <input
                                className="form-control"
                                id="admin-addBook-input"
                                name="category_code"
                                placeholder="카테고리 코드를 입력하세요."
                                value={formData.category_code}
                                onChange={handleChange}
                            />
                            {errors.category_code && <p className="text-danger">{errors.category_code}</p>}
                        </div>

                        <div id="admin-input-form" className="input-group mb-3">
                            <label id="admin-addBook-label" className="input-group-text">상세 내용</label>
                            <textarea
                                className="form-control"
                                id="admin-addBook-textarea"
                                name="bookDetail"
                                placeholder="도서 상세 내용을 입력하세요."
                                value={formData.bookDetail}
                                onChange={handleChange}
                            />
                            {errors.bookDetail && <p className="text-danger">{errors.bookDetail}</p>}
                        </div>

                        <div id="admin-input-form" className="input-group mb-3">
                            <label id="admin-addBook-label" className="input-group-text">소장 도서관</label>
                            <select id="admin-addBook-input" className="form-control" value={selectedLibrary} onChange={handleLibraryChange}>
                                <option value="">도서관 선택</option>
                                {Object.keys(libraries).map((library) => (
                                    <option key={library} value={library}>
                                        {library}
                                    </option>
                                ))}
                            </select>
                            <select id="admin-addBook-input" className="form-control" value={selectedSection} onChange={handleSectionChange} disabled={!selectedLibrary}>
                                <option id="admin-addBook-input" value="">도서관 선택</option>
                                {selectedLibrary &&
                                    libraries[selectedLibrary].map((section) => (
                                        <option key={section.name} value={section.name}>
                                            {section.name}
                                        </option>
                                    ))}
                            </select>
                            {errors.libName && <p className="text-danger">{errors.libName}</p>}
                        </div>

                        <div id="admin-input-form" className="input-group mb-3">
                            <label id="admin-addBook-label" className="input-group-text">도서 수량</label>
                            <input
                                type="number"
                                name="count"
                                className="form-control"
                                placeholder="해당 도서관 도서수량을 입력해주세요"
                                value={formData.count}
                                onChange={handleChange}
                            />
                            {errors.count && <p className="text-danger">{errors.count}</p>}
                        </div>

                        <div className="admin-addbook-button">
                            <button type="submit" className="btn btn-outline-dark">등록</button>
                            <button type="button" className="btn btn-outline-dark" onClick={handleReset}>초기화</button>
                            <button type="button" className="btn btn-outline-dark" onClick={() => navigate('/admin/book/list')}>목록보기</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default function () {
    return (
        <>
            <RedirectLogin />
            <Auth loginStatus={LOGIN_STATUS.LOGGED_IN} roles={ROLES.ADMIN}>
                <AddBook />
            </Auth>
        </>
    );
}
