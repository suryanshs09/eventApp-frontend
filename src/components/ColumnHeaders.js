import { format, parseISO } from 'date-fns'

export const OrganizerColumns = [
    {
        Header: 'Id',
        accessor: 'id'
    },
    {
        Header: 'Name',
        accessor: 'username'
    },
    {
        Header: 'Phone',
        accessor: 'contact'
    },
    {
        Header: 'Email',
        accessor: 'email'
    }
];

export const EventColumns = [
    {
        Header: 'Id',
        accessor: 'id'
    },
    {
        Header: 'Name',
        accessor: 'name'
    },
    {
        Header: 'Date',
        accessor: row => format(parseISO(row.startDate), "dd-MM-yyyy")  
    },
    {
        Header: 'Venue',
        accessor: 'location'
    },
    {
        Header: 'Organizer',
        accessor: 'organizerDetails.username'
    }
];

export const GuestColumns = [
    {
        Header: 'Id',
        accessor: 'id'
    },
    {
        Header: 'Name',
        accessor: 'username'
    },
    {
        Header: 'Phone',
        accessor: 'contact'
    },
    {
        Header: 'Email',
        accessor: 'email'
    },
    {
        Header: 'Date of Birth',
        accessor: row => format(parseISO(row.dob), "dd-MM-yyyy")
    }
];