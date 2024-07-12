import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import "./AddBook.css";
import AdminHeader from './AdminHeader';
import AdminSide from './AdminSide';
import { GlobalStyles } from "./GlobalStyles";

const AddBook = ({ csrf = {} }) => {
    const initialFormData = {
        id: '',
        isbn: '',
        title: '',
        author: '',
        publisher: '',
        pub_date: '',
        category_code: '',
        location: '',
        bookDetail: '',
        lib_name: '',
        count: '',
        status: 'AVAILABLE',
        bookImg: null,
    };

    const initialErrors = {
        isbn: '',
        title: '',
        author: '',
        publisher: '',
        pub_date: '',
        category_code: '',
        location: '',
        bookDetail: '',
        lib_name: '',
        count: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState(initialErrors);
    const [selectedLibrary, setSelectedLibrary] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [imagePreview, setImagePreview] = useState(null); // 이미지 미리보기 상태
    const fileInputRef = useRef(null); // 파일 입력 요소에 접근하기 위한 ref

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

    const libraries = {
        '상록구': ['감골도서관', '반월도서관', '부곡도서관', '본오도서관', '상록수도서관', '상록어린이도서관', '성포도서관', '수암도서관'],
        '단원구': ['관산도서관', '단원어린이도서관', '미디어도서관', '선부도서관', '원고잔도서관'],
    };

    const handleDateChange = (date) => {
        setFormData((prevData) => ({
            ...prevData,
            pub_date: date,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            pub_date: '',
        }));
    };

    const handleFileChange = (e) => {
        const { files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            bookImg: files[0],
        }));

        // 이미지 미리보기 설정
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
            fileInputRef.current.value = ''; // 파일 입력 필드 초기화
        }
    };

    const handleReset = () => {
        setFormData(initialFormData);
        setErrors(initialErrors);
        setSelectedLibrary('');
        setSelectedSection('');
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // 파일 입력 필드 초기화
        }
    };

    const handleLibraryChange = (e) => {
        setSelectedLibrary(e.target.value);
        setFormData((prevData) => ({
            ...prevData,
            lib_name: '',
        }));
    };

    const handleSectionChange = (e) => {
        setSelectedSection(e.target.value);
        setFormData((prevData) => ({
            ...prevData,
            lib_name: e.target.value,
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
            tempErrors.pub_date = '출판년도를 선택해주세요';
            isValid = false;
        }
        if (!formData.category_code) {
            tempErrors.category_code = '카테고리 코드를 입력해주세요';
            isValid = false;
        }
        if (!formData.location) {
            tempErrors.location = '소장 위치를 입력해주세요';
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

        const formDataCopy = {
            ...formData,
            pub_date: formData.pub_date ? formData.pub_date.getFullYear().toString() : '',
        };

        const data = new FormData();
        data.append('book', new Blob([JSON.stringify(formDataCopy)], { type: 'application/json' }));

        if (formData.bookImg) {
            data.append('file', formData.bookImg);
        }

        try {
            const response = await axios.post('http://localhost:8090/api/admin/book/new', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    [csrf.parameterName]: csrf.token,
                },
            });

            console.log(response.data);
            alert('도서가 성공적으로 등록되었습니다!');
            window.location.href = '/admin/booklist';
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <GlobalStyles width="100vw" />

            <div className="admin-page">
                <div className="admin-base">
                    <AdminHeader />
                    <AdminSide />
                </div>

                <main className="admin-addBook-main">
                    <div className="admin-addBook-body">
                        <div className="admin-addBook-title">
                            <h1>도서 등록</h1>
                        </div>

                        <form className="admin-addBook-form" onSubmit={handleSubmit}>
                            <input type="hidden" name="id" value={formData.id} />
                            <input type="hidden" name="status" value="AVAILABLE" />
                            
                            <label className="input-group-text">도서 표지</label>
                            {imagePreview && (
                                <div className="form-group">
                                    <img src={imagePreview} alt="미리보기" className="img-thumbnail" />
                                    <button type="button" className="btn btn-outline-dark" onClick={handleImageCancel}>취소</button>
                                </div>
                            )}
                            <input
                                type="file"
                                className="custom-file-input"
                                name="bookImgFile"
                                onChange={handleFileChange}
                                ref={fileInputRef}
                            />
                            <label className="custom-file-label">도서 이미지</label>

                            <div className="input-group mb-3">
                                <label className="input-group-text">도서명</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    placeholder="도서명을 입력해주세요"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                                {errors.title && <p className="text-danger">{errors.title}</p>}
                            </div>

                            <div className="input-group mb-3">
                                <label className="input-group-text">ISBN</label>
                                <input
                                    type="text"
                                    name="isbn"
                                    className="form-control"
                                    placeholder="ISBN을 입력해주세요"
                                    value={formData.isbn}
                                    onChange={handleChange}
                                />
                                {errors.isbn && <p className="text-danger">{errors.isbn}</p>}
                            </div>

                            <div className="input-group mb-3">
                                <label className="input-group-text">저자</label>
                                <input
                                    type="text"
                                    name="author"
                                    className="form-control"
                                    placeholder="저자를 입력해주세요"
                                    value={formData.author}
                                    onChange={handleChange}
                                />
                                {errors.author && <p className="text-danger">{errors.author}</p>}
                            </div>

                            <div className="input-group mb-3">
                                <label className="input-group-text">출판사</label>
                                <input
                                    type="text"
                                    name="publisher"
                                    className="form-control"
                                    placeholder="출판사를 입력해주세요"
                                    value={formData.publisher}
                                    onChange={handleChange}
                                />
                                {errors.publisher && <p className="text-danger">{errors.publisher}</p>}
                            </div>

                            <div className="input-group mb-3">
                                <label className="input-group-text">출판년도</label>
                                <DatePicker
                                    selected={formData.pub_date}
                                    onChange={handleDateChange}
                                    dateFormat="yyyy"
                                    showYearPicker
                                    className="form-control"
                                    placeholderText="출판년도를 입력해주세요"
                                />
                                {errors.pub_date && <p className="text-danger">{errors.pub_date}</p>}
                            </div>

                            <div className="input-group mb-3">
                                <label className="input-group-text">카테고리코드</label>
                                <input
                                    className="form-control"
                                    name="category_code"
                                    placeholder="카테고리 코드를 입력하세요."
                                    value={formData.category_code}
                                    onChange={handleChange}
                                />
                                {errors.category_code && <p className="text-danger">{errors.category_code}</p>}
                            </div>

                            <div className="input-group mb-3">
                                <label className="input-group-text">상세 내용</label>
                                <textarea
                                    className="form-control"
                                    name="bookDetail"
                                    placeholder="도서 상세 내용을 입력하세요."
                                    value={formData.bookDetail}
                                    onChange={handleChange}
                                />
                                {errors.bookDetail && <p className="text-danger">{errors.bookDetail}</p>}
                            </div>

                            <div className="input-group mb-3">
                                <label className="input-group-text">소장 도서관</label>
                                <select className="form-control" value={selectedLibrary} onChange={handleLibraryChange}>
                                    <option value="">도서관 선택</option>
                                    {Object.keys(libraries).map((library) => (
                                        <option key={library} value={library}>
                                            {library}
                                        </option>
                                    ))}
                                </select>
                                <select className="form-control" value={selectedSection} onChange={handleSectionChange} disabled={!selectedLibrary}>
                                    <option value="">도서관 선택</option>
                                    {selectedLibrary &&
                                        libraries[selectedLibrary].map((section) => (
                                            <option key={section} value={section}>
                                                {section}
                                            </option>
                                        ))}
                                </select>
                                {errors.lib_name && <p className="text-danger">{errors.lib_name}</p>}
                            </div>

                            <div className="input-group mb-3">
                                <label className="input-group-text">소장 위치</label>
                                <input
                                    type="text"
                                    name="location"
                                    className="form-control"
                                    placeholder="소장 위치를 입력해주세요"
                                    value={formData.location}
                                    onChange={handleChange}
                                />
                                {errors.location && <p className="text-danger">{errors.location}</p>}
                            </div>

                            <div className="input-group mb-3">
                                <label className="input-group-text">도서 수량</label>
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

                            <div className="form-group">
                                <button type="submit" className="btn btn-outline-dark">등록</button>
                                <button type="button" className="btn btn-outline-dark" onClick={handleReset}>초기화</button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
};

export default AddBook;
