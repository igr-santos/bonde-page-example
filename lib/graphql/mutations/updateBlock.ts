import { gql } from "urql";

export default gql`
    mutation ($id: Int!, $updated_fields: blocks_set_input!) {
        update_blocks_by_pk(pk_columns: { id: $id }, _set: $updated_fields) {
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
`