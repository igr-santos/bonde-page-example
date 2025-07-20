import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "https://auth.bonde.devel",
    realm: "bonde",
    clientId: "next",
});

export default keycloak;
