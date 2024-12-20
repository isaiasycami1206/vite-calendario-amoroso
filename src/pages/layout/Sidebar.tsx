import React from 'react';
import Btnlike from '../../components/common/BtnLike';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome} from '@fortawesome/free-solid-svg-icons';
import { Accordion, } from 'react-bootstrap';
import '../../assets/styles/Sidebar.css'; // Archivo CSS para estilos personalizados

const Sidebar: React.FC = () => {

    // const { t } = useTranslation();
    
    return (
        <div className="sidebar d-flex flex-column d-md-block h-100">
            <nav className="flex-grow-1">
                <ul className="list-unstyled">
                    <li className="sidebar-item mt-1 pe-1">
                        <Btnlike btnStyle='sidebar-link d-flex align-items-center' like={'/'} >
                            <FontAwesomeIcon icon={faHome} className="sidebar-icon" />
                            <span className="ms-2">Inicio</span>
                        </Btnlike>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header className='m-0'>
                                    <div>
                                        <FontAwesomeIcon icon={faGear} className="sidebar-icon" />
                                        <span className="ms-2">Configuración</span>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body className='p-0'>
                                    <ul className="list-unstyled ps-3">
                                        <Btnlike btnStyle='sidebar-sublink pe-2' like={'config/Usuario-Epp'} >Usuario Epp</Btnlike>
                                        <Btnlike btnStyle='sidebar-sublink pe-2' like={'config/Causales-solicitud'} >Causales de solicitud</Btnlike>
                                        <Btnlike btnStyle='sidebar-sublink pe-2' like={'config/Perfil-Epp'} >Perfil Epp</Btnlike>
                                        <Btnlike btnStyle='sidebar-sublink pe-2' like={'config/Restricciones-Epp'} >Restricciones Epp</Btnlike>
                                        <Btnlike btnStyle='sidebar-sublink pe-2' like={'config/MaintainerCenterCost'} >Mantenedor Centro Costo</Btnlike>
                                        <Btnlike btnStyle='sidebar-sublink pe-2' like={'config/AccessModule'} >Accesos</Btnlike>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;