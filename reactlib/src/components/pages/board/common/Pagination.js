
function Pagination ({ currentPage, totalPages, onPageChange }) {
    
    {/* 페이징 */}
    return (
        <ul className="board_pagination">
            <li className="page-item">
                <button onClick={() => onPageChange(1)} className="page-link">
                    {'<<'}
                </button>
            </li>
            <li className="page-item">
                <button
                    onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                    className="page-link">
                    {'<'}
                </button>
            </li>
            {[...Array(totalPages)].map((_, i) => (
                <li key={i} className="page-item">
                    <button
                        onClick={() => onPageChange(i + 1)}
                        className="page-link">
                        {i + 1}
                    </button>
                </li>
            ))}
            <li className="page-item">
                <button
                    onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                    className="page-link">
                    {'>'}
                </button>
            </li>
            <li className="page-item">
                <button onClick={() => onPageChange(totalPages)} className="page-link">
                    {'>>'}
                </button>
            </li>
        </ul>
    );
};

export default Pagination;