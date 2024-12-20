import React from 'react';
import { ButtonGroup, Placeholder, Table } from 'react-bootstrap';


const TablePlaceHolder: React.FC = () => {
    return (
        <Table responsive striped bordered hover>
            <Placeholder as={'thead'} animation="glow">
                <tr>
                    <th scope="col-4">
                        <Placeholder xs={12} />
                    </th>
                    <th scope="col">
                        <Placeholder xs={12} />
                    </th>
                    <th scope="col">
                        <Placeholder xs={12} />
                    </th>
                    <th scope="col">
                        <Placeholder xs={12} />
                    </th>
                </tr>
            </Placeholder>
            <Placeholder as={'tbody'} animation="glow">
                <tr>
                    <td>
                        <Placeholder xs={12} />
                    </td>
                    <td>
                        <Placeholder xs={12} />
                    </td>
                    <td>
                        <Placeholder xs={12} />
                    </td>
                    <td width={20}>
                        <ButtonGroup size="sm" aria-label="Basic example">
                            <Placeholder.Button size="sm" variant="danger"></Placeholder.Button>
                            <Placeholder.Button size="sm" variant="warning"></Placeholder.Button>
                        </ButtonGroup>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Placeholder xs={12} />
                    </td>
                    <td>
                        <Placeholder xs={12} />
                    </td>
                    <td>
                        <Placeholder xs={12} />
                    </td>
                    <td>
                        <ButtonGroup size="sm" aria-label="Basic example">
                            <Placeholder.Button size="sm" variant="danger"></Placeholder.Button>
                            <Placeholder.Button size="sm" variant="warning"></Placeholder.Button>
                        </ButtonGroup>
                    </td>
                </tr>
            </Placeholder>
        </Table>
    );
};

export default TablePlaceHolder;