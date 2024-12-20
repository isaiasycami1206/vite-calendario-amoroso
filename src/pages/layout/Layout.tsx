// Layout.tsx
import React, { useState } from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const Layout: React.FC = () => {
    const [viewMode, setViewMode] = useState<'1' | '2' | '3' | '4'>('3'); // Controla la cantidad de meses visibles
    const [rowView, setRowView] = useState<boolean>(false); // Mostrar por filas
    const [distribucion, setDistribucion] = useState<boolean>(true); // Controla la distribución
    const [darkMode, setDarkMode] = useState(false);
    const [isTodayAndPast, setIsTodayAndPast] = useState(true);
    const [screenType, setScreenType] = useState("");

    return (
        <div>
            <Header
                setViewMode={setViewMode}
                viewMode={viewMode}
                setRowView={setRowView}
                distribucion={distribucion}
                setDistribucion={setDistribucion}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                screenType={screenType}
                setScreenType={setScreenType}
                setIsTodayAndPast={setIsTodayAndPast}
                isTodayAndPast={isTodayAndPast}
            />
            <Row className="g-0" style={{ minHeight: '89vh' }}>
                <Col>
                    <Container fluid className="p-4">
                        <Outlet context={{ viewMode, rowView, distribucion, darkMode, screenType, isTodayAndPast}} />
                    </Container>
                </Col>
            </Row>
        </div>
    );
};

export default Layout;
