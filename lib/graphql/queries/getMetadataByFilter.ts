import { gql } from "urql";

export default gql`
query ($filter: mobilizations_bool_exp!){
    mobilizations(where: $filter) {
        id
        name
        facebook_share_title
        facebook_share_description
        facebook_share_image
        twitter_share_text
        favicon
    }
}
`;