import { faChartLine, faFileLines, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Dashboard: React.FC = () => {

    const { t } = useTranslation();

    return (
        <Container fluid className="mt-4">
            {/* Fila de tarjetas de resumen */}
            <Row>
                <Col md={4}>
                    <Card className="shadow-sm mb-4">
                        <Card.Body>
                            <Row>
                                <Col xs={3}>
                                    <FontAwesomeIcon icon={faUser} className="text-primary" />
                                </Col>
                                <Col xs={9}>
                                    <h5>Total Usuarios</h5>
                                    <h3>150</h3>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="shadow-sm mb-4">
                        <Card.Body>
                            <Row>
                                <Col xs={3}>
                                    <FontAwesomeIcon icon={faFileLines} className="text-success" />
                                </Col>
                                <Col xs={9}>
                                    <h5>Total Solicitudes</h5>
                                    <h3>320</h3>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="shadow-sm mb-4">
                        <Card.Body>
                            <Row>
                                <Col xs={3}>
                                    <FontAwesomeIcon icon={faChartLine} /* size={40}  */ className="text-danger" />
                                </Col>
                                <Col xs={9}>
                                    <h5>Total Reportes</h5>
                                    <h3>120</h3>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Gráficas (puedes integrar Chart.js o Recharts aquí) */}
            <Row>
                <Col md={8}>
                    <Card className="shadow-sm mb-4">
                        <Card.Header as="h5">Gráfica de Solicitudes</Card.Header>
                        <Card.Body>
                            {/* Aquí puedes integrar un gráfico de solicitudes */}
                            <div className="text-center">
                                <p>Gráfico de solicitudes (placeholder)</p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="shadow-sm mb-4">
                        <Card.Header as="h5">Actividades Recientes</Card.Header>
                        <Card.Body>
                            <Table responsive striped hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Descripción</th>
                                        <th>Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Nuevo usuario agregado</td>
                                        <td>01/10/2024</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Solicitud de EPP aprobada</td>
                                        <td>02/10/2024</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Reporte generado</td>
                                        <td>03/10/2024</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Tabla de últimas solicitudes */}
            <Row>
                <Col>
                    <Card className="shadow-sm">
                        <Card.Header as="h5">Últimas Solicitudes de EPP</Card.Header>
                        <Card.Body>
                            <Table responsive striped hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Trabajador</th>
                                        <th>Tipo de Solicitud</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Juan Pérez</td>
                                        <td>Solicitud Normal</td>
                                        <td>Aprobada</td>
                                        <td>
                                            <Button variant="primary" size="sm">Ver</Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>María González</td>
                                        <td>Solicitud Urgente</td>
                                        <td>Pendiente</td>
                                        <td>
                                            <Button variant="primary" size="sm">Ver</Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Carlos López</td>
                                        <td>Solicitud de Reemplazo</td>
                                        <td>Rechazada</td>
                                        <td>
                                            <Button variant="primary" size="sm">Ver</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
