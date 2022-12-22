import { Box, Button, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Spinner, Center, useOutsideClick } from '@chakra-ui/react';
import { useReactTable, createColumnHelper, getCoreRowModel, flexRender, Table } from '@tanstack/react-table';
import { useState } from 'react';
import { getUserList } from '../../apis/get';
import UserForm from '../../components/HeaderBar/UserForm/UserForm';
import styles from './users.module.scss';
import { useQuery } from '@tanstack/react-query';

export interface User {
    name: string,
    email: string,
    phone: string,
    role: string,
    status: string
}
interface Columns extends User {
    action: void,
}

const columnHelper = createColumnHelper<Columns>();

export default function UsersPage() {
    const [editingUser, setEditingUser] = useState<User>({
        name: '',
        email: '',
        phone: '',
        role: '',
        status: '',
    });
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { isLoading, isError, data } = useQuery({
        queryKey: ['getUserList'],
        queryFn: () => getUserList().then(res => res.json())
    });

    const columns = [
        columnHelper.accessor('name', {
            header: () => <span className={styles.columnHeader}>Name</span>,
        }),
        columnHelper.accessor('email', {
            header: () => <span className={styles.columnHeader}>Email</span>,
        }),
        columnHelper.accessor('phone', {
            header: () => <span className={styles.columnHeader}>Phone</span>,
        }),
        columnHelper.accessor('role', {
            header: () => <span className={styles.columnHeader}>Role</span>,
        }),
        columnHelper.accessor('status', {
            header: () => <span className={styles.columnHeader}>Status</span>,
        }),
        columnHelper.accessor('action', {
            header: () => <span className={styles.columnHeader}>Actions</span>,
            cell: info => <Button colorScheme={`teal`} size={`xs`} onClick={() => handleEditUser(info.row.original)}>Edit</Button>
        }),
    ]

    const handleEditUser = (user: User) => {
        // setEditingUser(user);
        onOpen();
    }

    const table = useReactTable({
        data: data ? data.usersList.map(row => {
            return {
                name: row['fullName'],
                email: row['email'],
                phone: row['phoneNumber'],
                role: row['userRole'][0],
                status: row['userStatus'],
            }
        }) : [],
        columns,
        getCoreRowModel: getCoreRowModel()
    });

    if (isLoading) return <Center h={`100vh`}><Spinner /></Center>

    if (isError) return <Text as="span">Error!</Text>


    return (
        <>
            <table className={styles.table}>
                <thead>
                    {table?.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} >
                                    <Box p={2} textAlign={`left`}>
                                        {
                                            header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )
                                        }
                                    </Box>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    <Box className={styles.cellContainer} p={2}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </Box>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    {table.getFooterGroups().map(footerGroup => (
                        <tr key={footerGroup.id}>
                            {footerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.footer,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </table>

            <Modal closeOnEsc={true} closeOnOverlayClick={true} variant={`flyout`} isOpen={isOpen} onClose={onClose} size={`full`} motionPreset={`none`}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader p={2} pl={4} borderBottom={`1px solid var(--chakra-colors-gray-200)`} fontSize={`md`}>Edit User</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <UserForm {...editingUser} />
                    </ModalBody>

                    <ModalFooter justifyContent={`flex-start`} p={2} pl={4} borderTop={`1px solid var(--chakra-colors-gray-200)`} fontSize={`md`}>
                        <Button mr={3} onClick={onClose} size={`xs`}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
