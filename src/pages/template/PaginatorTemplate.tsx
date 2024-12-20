import React from 'react';
import { Pagination } from 'react-bootstrap';

interface PaginatorTemplateProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginatorTemplate: React.FC<PaginatorTemplateProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pageItems = [];

    if (totalPages <= 10) {
        // Si el número total de páginas es menor o igual a 10, se muestran todas las páginas
        for (let page = 1; page <= totalPages; page++) {
            pageItems.push(
                <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </Pagination.Item>
            );
        }
    } else {
        // Mostrar las primeras 3 páginas
        for (let page = 1; page <= 3; page++) {
            pageItems.push(
                <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </Pagination.Item>
            );
        }

        // Agregar puntos suspensivos si es necesario (si la página actual está lejos de las primeras 3 páginas)
        if (currentPage > 5) {
            pageItems.push(<Pagination.Ellipsis key="ellipsis-start" disabled />);
        }

        // Mostrar 2 páginas antes de la página actual y 2 después
        for (let page = Math.max(4, currentPage - 2); page <= Math.min(totalPages - 3, currentPage + 2); page++) {
            if (page > 3 && page < totalPages - 2) {
                pageItems.push(
                    <Pagination.Item
                        key={page}
                        active={page === currentPage}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </Pagination.Item>
                );
            }
        }

        // Agregar puntos suspensivos si es necesario (si la página actual está lejos de las últimas 3 páginas)
        if (currentPage < totalPages - 4) {
            pageItems.push(<Pagination.Ellipsis key="ellipsis-end" disabled />);
        }

        // Mostrar las últimas 3 páginas
        for (let page = totalPages - 2; page <= totalPages; page++) {
            pageItems.push(
                <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </Pagination.Item>
            );
        }
    }

    return (
        <Pagination>
            <Pagination.First onClick={() => onPageChange(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
            {pageItems}
            <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
    );
};

export default PaginatorTemplate;
