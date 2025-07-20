import { gql } from "urql";

export default gql`
query ($filter: mobilizations_bool_exp!){
    mobilizations(where: $filter) {
        id
        name
        google_analytics_code
        facebook_share_title
        facebook_share_description
        facebook_share_image
        color_scheme
        header_font
        body_font
    }
    
    blocks(where: { mobilization: $filter }, order_by: { position: asc_nulls_last }) {
        id
        menu_hidden
        hidden
        bg_class
        bg_image
        name
        position
        mobilization_id
    }
    
    widgets(where: { block: { mobilization: $filter } }, order_by: { id: asc_nulls_last }) {
        id
        kind
        settings
        block_id
        sm_size
        md_size
        lg_size
    }
}
`;