import React from "react";

function FileItem({ image, handleImgChange,  }) {

    return (
        <div>
            {
                <div key={image.id}>
                    <input type="file" onChange={(e) => handleImgChange(image.id, e.target.files[0])} />
                    <input type='hidden' value={image.id} />
                    <label>{image.oriImgName}</label>
                </div>
            }
        </div>
    );

}

export default FileItem;