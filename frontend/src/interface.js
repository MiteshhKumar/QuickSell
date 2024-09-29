const Ticket = {
    id: '',
    title: '',
    tag: [],
    userId: '',
    status: '',
    priority: 0,
};

// User structure
const User = {
    id: '',
    name: '',
    available: false,
};

// Col structure
const Col = {
    col: [], // Array of Ticket objects
};

// UserIdToData structure
const UserIdToData = {
    userData: {}, // Record of User objects by ID
};