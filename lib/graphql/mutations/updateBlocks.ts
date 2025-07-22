import { gql } from "urql";

export default gql`
    mutation ($updates: [blocks_updates!]!) {
        update_blocks_many(updates: $updates) {
            returning {
                id
                menu_hidden
                hidden
                bg_class
                bg_image
                name
                position
                mobilization_id
            }
        }
    }
`;