import ImgPreview from "./ImgPreview";
import BoardFileLabel from "./BoardFileLabel";

function BoardImgList({ images, handleImgChange, onImgDelete }) {

    return (
        <div class='img-container1'>
            <div class='img-pre'>
                {images.map(putImage => (
                    <ImgPreview key={putImage.id} putImage={putImage} />
                ))}
            </div>
            <div class='file-uplo'>
                {images.map(putImage => (
                    <BoardFileLabel putImage={putImage} handleImgChange={handleImgChange} onImgDelete={onImgDelete} />
                ))}
            </div>
        </div>


    )
}

export default BoardImgList;