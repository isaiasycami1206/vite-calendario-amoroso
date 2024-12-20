import React, { useState, useEffect } from 'react';
import { Navbar, Container, Button, Offcanvas, Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import mapacheLogo from '../../assets/img/mapache.png';

interface HeaderProps {
    setViewMode: (mode: '1' | '2' | '3') => void;
    viewMode: '1' | '2' | '3' | '4';
    setRowView: (rowView: boolean) => void;
    distribucion: boolean;
    setDistribucion: (distribucion: boolean) => void;
    darkMode: boolean;
    setDarkMode: (mode: boolean) => void;
    screenType: string;
    setScreenType: (type: string) => void;
    isTodayAndPast: boolean;
    setIsTodayAndPast: (mode: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
    setViewMode,
    viewMode,
    setRowView,
    distribucion,
    setDistribucion,
    darkMode,
    setDarkMode,
    screenType,
    setScreenType,
    isTodayAndPast,
    setIsTodayAndPast
}) => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [isRowView, setIsRowView] = useState(false);

    const toggleSidebar = () => setShowSidebar(!showSidebar);

    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            if (width <= 425) {
                setScreenType('mobile');
                if (viewMode !== '1') setViewMode('1');
            } else if (width > 425 && width <= 990) {
                setScreenType('tablet');
                if (viewMode === '3') setViewMode('2');
            } else if (width > 990 && width <= 1440) {
                setScreenType('laptop');
            } else if (width > 1440) {
                setScreenType('television');
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [viewMode, setScreenType, setViewMode]);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    const toggleRowView = () => {
        setIsRowView((prev) => !prev);
        setRowView(!isRowView);
    };

    const handleDistribucionChange = () => {
        const distribucionDefault = !distribucion;
        setDistribucion(distribucionDefault);
        if (distribucion && viewMode === '3') {
            setViewMode('2');
        }
    };

    const reloadPage = () => {
        window.location.reload();
    };

    return (
        <>
            <Navbar className="bg-custom-dark fixed-top" expand="lg">
                <Container fluid>

                <Navbar>

                    <Navbar.Brand href="/vite-calendario-amoroso/">
                        <img src={mapacheLogo} alt="logo-minera" width={30}/>
                    </Navbar.Brand>
                    <Navbar.Brand href="/vite-calendario-amoroso/" style={{ color: "#fff" }}>
                        Calendario Amoroso
                    </Navbar.Brand>
                    </Navbar>

                    {/* Botón Sidebar para pantallas pequeñas */}
                    <div className="d-md-none">
                        <Button variant="outline-light" onClick={toggleSidebar}>
                            <FontAwesomeIcon icon={faBars} />
                        </Button>
                    </div>

                    {/* Menú Principal */}
                    <div className="d-none d-md-flex">

                        <Button variant="outline-light" onClick={()=> setIsTodayAndPast(!isTodayAndPast)} className="me-2">
                            {isTodayAndPast ? 'Desmarcar Hoy y Pasados' : 'Marcar Hoy y Pasados'}
                        </Button>

                        <DropdownButton
                            variant="outline-light"
                            title="Mostrar Meses"
                            className="me-2"
                            onSelect={(eventKey) => setViewMode(eventKey as '1' | '2' | '3')}
                        >
                            <Dropdown.Item eventKey="1">1 Mes</Dropdown.Item>
                            {(screenType === 'tablet' || screenType === 'laptop' || screenType === 'television') && (
                                <Dropdown.Item eventKey="2">2 Meses</Dropdown.Item>
                            )}
                            {screenType === 'laptop' || screenType === 'television' ? (
                                distribucion && <Dropdown.Item eventKey="3">3 Meses</Dropdown.Item>
                            ) : null}
                        </DropdownButton>

                        <Button variant="outline-light" onClick={toggleRowView} className="me-2">
                            {isRowView ? 'Vista en Cascada' : 'Vista en Filas'}
                        </Button>

                        <Button variant="outline-light" onClick={handleDistribucionChange} className="me-2">
                            Cambiar Distribución ({distribucion ? 'True' : 'False'})
                        </Button>

                        <Button variant="outline-light" onClick={reloadPage} className="me-2">
                            Recargar Página
                        </Button>

                        <Button variant="outline-light" onClick={toggleDarkMode} className="me-2">
                            <FontAwesomeIcon icon={darkMode ? faMoon : faSun} />
                        </Button>
                    </div>
                </Container>
            </Navbar>

            {/* Sidebar para pantallas pequeñas */}
            <Offcanvas show={showSidebar} onHide={toggleSidebar}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menú</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <DropdownButton
                        variant="outline-secondary"
                        title="Mostrar Meses"
                        className="mb-3 w-100"
                        style={{}}
                        onSelect={(eventKey) => {
                            setViewMode(eventKey as '1' | '2' | '3');
                            toggleSidebar();
                        }}
                    >
                        <Dropdown.Item eventKey="1">1 Mes</Dropdown.Item>
                        {(screenType === 'tablet' || screenType === 'laptop' || screenType === 'television') && (
                            <Dropdown.Item eventKey="2">2 Meses</Dropdown.Item>
                        )}
                        {screenType === 'laptop' || screenType === 'television' ? (
                            distribucion && <Dropdown.Item eventKey="3">3 Meses</Dropdown.Item>
                        ) : null}
                    </DropdownButton>

                    <Button variant="outline-secondary" onClick={toggleRowView} className="w-100 mb-3">
                        {isRowView ? 'Vista en Cascada' : 'Vista en Filas'}
                    </Button>

                    <Button variant="outline-secondary" onClick={handleDistribucionChange} className="w-100  mb-3">
                        Cambiar Distribución ({distribucion ? 'True' : 'False'})
                    </Button>

                    <Button variant="outline-secondary" onClick={()=> setIsTodayAndPast(!isTodayAndPast)} className="w-100 mb-3">
                        {isTodayAndPast ? 'Desmarcar Hoy y Pasados' : 'Marcar Hoy y Pasados'}
                    </Button>

                    <Button variant="outline-secondary" onClick={reloadPage} className="w-100 mb-3">
                        Recargar Página
                    </Button>

                    <Button variant="outline-secondary" onClick={toggleDarkMode} className="w-100 mb-3">
                        {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
                    </Button>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default Header;
