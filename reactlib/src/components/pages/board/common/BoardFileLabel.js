import React from 'react';
import useAuth, { ROLES } from '../../../hooks/useAuth';

function BoardFileLabel({ putImage, handleImgChange, onImgDelete, }) {

    const { roles } = useAuth();

    return (
        <div key={putImage.id} class='img-upload'>
            {roles === ROLES.ADMIN &&<input type="file" id={`fileInput-${putImage.id}`}  class="hidden-input" onChange={(e) => handleImgChange(putImage.id, e.target.files[0])} />}
            <input type='hidden' value={putImage.id} />

            <label htmlFor={`fileInput-${putImage.id}`} className="file-label">
                {putImage.file == null ? putImage.oriImgName : putImage.file.name}
                    {roles === ROLES.ADMIN && <button type="button" onClick={() => onImgDelete(putImage)}>삭제</button>}
            </label>
        </div>
        
    )
}
export default BoardFileLabel;