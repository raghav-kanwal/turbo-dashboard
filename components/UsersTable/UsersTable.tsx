import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Tfoot, Tag, TagLeftIcon, Button } from "@chakra-ui/react";
import { info } from "console";
import { FaCircle } from "react-icons/fa";
import { User, UserFormFields } from "../../interfaces";

interface Props {
    data: UserFormFields[],
    onEditClick: Function,
}

export default function UsersTable({ data, onEditClick }: Props) {
    return (
        <TableContainer>
            <Table size='sm'>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Role</Th>
                        <Th>Status</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data?.map(user => {
                        return (
                            <Tr key={user.email}>
                                <Td>{user.fullName ?? "-"}</Td>
                                <Td>{user.email ?? "-"}</Td>
                                <Td>{user.userRole ?? "-"}</Td>
                                <Td>
                                    {user.userStatus ? (
                                        <Tag colorScheme="green">
                                            <TagLeftIcon as={FaCircle} fontSize={`5px`} />
                                            Enabled
                                        </Tag>
                                    ) : (
                                        <Tag colorScheme="red">
                                            {" "}
                                            <TagLeftIcon as={FaCircle} fontSize={`5px`} />
                                            Disabled
                                        </Tag>
                                    )}
                                </Td>
                                <Td>
                                    <Button
                                        colorScheme={`teal`}
                                        size={`xs`}
                                        onClick={() => onEditClick(user.email)}
                                    >
                                        Edit
                                    </Button>
                                </Td>
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    )
}