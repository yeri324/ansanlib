import ImgPreview from "./ImgPreview";
import BoardFileLabel from "./BoardFileLabel";

function BoardImgList({ images, handleImgChange, onImgDelete }) {

    return (
       
       <div class='img-container'>
        {images.map(putImage => (
            <>
            <ImgPreview key={putImage.id} putImage={putImage} />

            </>
        ))}

        {images.map(putImage => (
            <BoardFileLabel putImage={putImage} handleImgChange={handleImgChange} onImgDelete={onImgDelete} />
        ))}
    </div>


    )
}

export default BoardImgList;