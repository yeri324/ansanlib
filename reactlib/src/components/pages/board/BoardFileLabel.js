

function BoardFileLabel({ putImage, handleImgChange, onImgDelete, }) {
    return (
        <div key={putImage.id} class='img-upload'>
            <input type="file" onChange={(e) => handleImgChange(putImage.id, e.target.files[0])} />
            <input type='hidden' value={putImage.id} />
            {/* <label>{putImage.file == null ? putImage.oriImgName : putImage.file.name}</label> */}
            <button type="button" onClick={() => onImgDelete(putImage)}>이미지 삭제</button>
        </div>
    )
}
export default BoardFileLabel;