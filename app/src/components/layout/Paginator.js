import styles from './css/Paginator.module.css'

function Paginatior({ currentPage, totalPages, onPageChange }) {
    const pages = []

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }

    return (
        <div className={styles.pagination_container}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Anterior
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    className={page === currentPage ? styles.active : ''}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Próximo
            </button>
        </div>
    )
}

export default Paginatior