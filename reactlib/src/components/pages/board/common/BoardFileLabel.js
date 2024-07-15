function BoardFileLabel({ putImage, handleImgChange, onImgDelete, }) {

    return (
        <div key={putImage.id} class='img-upload'>
            <input type="file" id={`fileInput-${putImage.id}`}  class="hidden-input" onChange={(e) => handleImgChange(putImage.id, e.target.files[0])} />
            <input type='hidden' value={putImage.id} />
            {/* <label for={`fileInput-${putImage.id}`} class="file-label">{putImage.file == null ? putImage.oriImgName : putImage.file.name}</label> */}

            <label htmlFor={`fileInput-${putImage.id}`} className="file-label">
                {putImage.file == null ? putImage.oriImgName : putImage.file.name}

                    <button type="button" onClick={() => onImgDelete(putImage)}>삭제</button>

            </label>
        </div>
        
    )
}
export default BoardFileLabel;