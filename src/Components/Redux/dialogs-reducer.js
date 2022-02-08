const SEND_MESSAGE = 'SEND-MESSAGE';

let initialstate = {
    dialogs: [
        { id: 1, name: 'Dimych' },
        { id: 2, name: 'Andrey' },
        { id: 3, name: 'Sveta' },
        { id: 4, name: 'Sasha' },
        { id: 5, name: 'Victor' },
        { id: 6, name: 'Valera' },
        { id: 6, name: 'Valera' }
    ],
    messages: [
        { id: 1, message: 'My personal ID is 18399' },
        { id: 2, message: 'React/Redux' },
        { id: 3, message: "It's sunny today who wants to take a walk" },
        { id: 4, message: 'Yo' },
        { id: 5, message: 'Yo' }
    ]
 };

const dialogsReducer = (state = initialstate, action) => {

    switch (action.type) {
                case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, { id: 6, message: body }]
            };
        default:
            return state;
    };
};

export const sendMessageCreator = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody});
export default dialogsReducer;