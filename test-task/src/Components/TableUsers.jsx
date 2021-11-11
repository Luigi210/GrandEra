import React, {useState, useEffect} from 'react';
import {Table, TableCell, TableRow} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {Button, Icon} from "semantic-ui-react";
import './TableUsers.sass';

export default function TableUsers({users, setUsers}){

    const [countOfRemove, setCountOfRemove] = useState(0);
    const [usersArray, setUsersArray] = useState([...users]);
    const [sorted, setSorted] = useState(false);
    const [checked, setChecked] = useState([]);
    console.log(checked);
    useEffect(() => {
        setUsersArray([...users]);
    }, [users]);

    useEffect(() => {
    }, [countOfRemove]);

    const removeUser = (id) => {
        setUsersArray(users.filter((element, index) => index !== id));
    }

    const sortByName = () => {
        function compare( a, b ) {
            if ( a.username < b.username ){
                return -1;
            }
            if ( a.username > b.username ){
                return 1;
            }
            return 0;
        }

        sorted === false ? setUsersArray(users.sort(compare)) : setUsersArray(users.reverse(compare));

    }

    return (
        <Table className={"table table-bordered table-striped"} style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
            <Table.Header className={"thead-dark align-middle"}>
                <TableRow >
                    <Table.HeaderCell scope={"col"} className={"text-center"}><div>#</div></Table.HeaderCell>
                    <Table.HeaderCell scope={"col"} className={"text-center"}><div>ID</div></Table.HeaderCell>
                    <Table.HeaderCell scope={"col"} className={"text-center"}><div>Add</div></Table.HeaderCell>
                    <Table.HeaderCell scope={"col"} className={"text-center d-flex justify-content-center align-items-center"}><span className={"p-2"}>username</span> <Button onClick={() => {
                            setSorted(!sorted);
                            return sortByName();
                        }
                    } className={"w-10 h-10 d-flex align-items-center justify-content-center p-3"}><Icon name={sorted === false ? "long arrow up" : "long arrow down"} className={"m-auto"}/></Button></Table.HeaderCell>
                    <Table.HeaderCell scope={"col"} className={"text-center"}><div>email</div></Table.HeaderCell>
                    <Table.HeaderCell scope={"col"} className={"text-center"}><div>website</div></Table.HeaderCell>
                </TableRow>
            </Table.Header>
            <Table.Body className={"align-middle"}>


                {usersArray.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            <Table.Row>
                                <TableCell className={"user-item-info text-center"}><input type={"checkbox"} disabled={checked.length === 4} onClick={() =>
                                    checked.filter((elem) => elem === true).length !== 4 ? setChecked([...checked, true]) : null
                                }/></TableCell>
                                <TableCell className={"user-item-info text-center"}>{item.id}</TableCell>
                                <TableCell className={"user-item-info text-center"}>
                                    <Link to={'/users/' + item.id}>Подробнее</Link></TableCell>
                                <TableCell className={"user-item-info text-center"}>{item.username}</TableCell>
                                <TableCell className={"user-item-info text-center"}>{item.email}</TableCell>
                                <TableCell className={"user-item-info text-center"}>{item.website}</TableCell>
                                <TableCell className={"user-item-info text-center"}><Button onClick={() => {
                                    setCountOfRemove(prevState => prevState + 1);
                                    return removeUser(index);
                                }}><Icon name={"remove"} className={"m-auto"}/></Button></TableCell>
                            </Table.Row>
                        </React.Fragment>
                    )
                })}
            </Table.Body>
        </Table>
    )
}
