import { gql } from "urql";

export default gql`
    mutation ($id: Int!, $updated_fields: widgets_set_input!) {
        update_widgets_by_pk(pk_columns: { id: $id }, _set: $updated_fields) {
            id
            kind
            settings
            block_id
            sm_size
            md_size
            lg_size
        }
    }
`