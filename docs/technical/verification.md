---
layout: page
title: Verification
hero_height: is-fullwidth
---
# OID4VP vp_token cross-device flow

1. User browses to Relying Party (RP) website
2. Browser on the user's device opens the Resource server/website associated with the RP on a device different from its
   wallet
3. The RS/website asks the RP component via its management API to generate a new Authorization Request URI
4. The RP generates a new `state` value which for instance can be used as a browser session using a secure HTTP only
   cookie, referred to as correlation id.
5. RP generates an ephemeral key pair to be used for key agreement for response encryption (not supported yet)
6. RP generates an OpenID4VP Authorization Request, binding it internally to the `state` and stores
7. RP makes sure the Request is accessible using the unique `request_uri` (
   e.g., `https://rp.example.com/oid4vp/requests/abcde-abcde-1234`);
   - The request is bound to the user's browser session
   - It is signed using a key bound to the RP's metadata that can be retrieved using the RP's client_id
   - It contains the presentation_definition containing the information about the requested (Q)EAAs
   - It contains RP's nonce and state
   - It contains the purpose given by the RP
8. RP returns the Request to the RS/RP website
9. Rs/RP website generate a QR code from the Authorization request
10. Rs/RP website returns a HTML page to the browser containing a QR-Code to the wallet app (
    e.g., `openid4vp://authorize?client_id=..&request_uri=https://rp.example.com/oidc/request/1234`). It also sets a
    Cookie with the `state` value.
11. The user launches his wallet and hits a button to scan QR-Code from the RP's website.
12. The wallet scans the QR code
13. The Wallet starts the OID4VP flow
14. The wallet decodes the Authorization Request from the QR-Code and extracts request_uri and client_id
15. The wallet optionally evaluates the trust associated with the client_id of the RP (optional)
16. The wallet app retrieves the Authorization Request Object from the RP website (
    e.g., `https://rp.example.com/oid4vp/requests/abcde-abcde-1234`)
    Example signed JWT when `client_id_scheme` is `did`. This is a vp_token only, meaning only presentation definition
    and thus Verifiable Presentation is expected

header:
```json
{
"typ": "oauth-authz-req+jwt",
"alg": "RS256",
"kid": "did:example:123#1"
}
```
body/payload:
```json
{
   "client_id": "did:example:123",
   "client_id_scheme": "did",
   "response_types": "vp_token",
   "redirect_uri": "https://relying-party.acme.org/callback",
   "nonce":"n-0S6_WzA2Mj",
   "presentation_definition": "..see PE chapter for examples..",
   "client_metadata": {
      "vp_formats": {
         "jwt_vp_json": {
            "alg": [
               "ES256",
               "ES256K"
            ]
         },
         "mso_mdoc": {
            "proof_type": [
               "ES256"
            ]
         }
      }
   }
}

```

See also: [Presentation Exchange explanation](./PresentationExchange.md)

17. The RP website return the signed Authorization Request Object JWT
18. The wallet validates the Authorization Request signature (JWT) using the RP's public key

- Was the signature valid and the key bound to the RP's metadata? This ensures that the Authorization Request was not
  tampered with;

19. The wallet validates the Presentation Exchange's Presentation Definition to be valid (presentation_definition)
20. The wallet optionally filters out any Verifiable Credentials that cannot satisfy the presentation_definition
21. The wallet notifies the user in case credentials are missing. Or to be more precise, in case presentation_definition
    input descriptors cannot be satisfied.

- In the future a trust framework could would list all issuers and their credential types, allowing for a nicer UX, by
  redirecting the user to (Q)EAA Providers in case credentials are missing.

22. Consent: The Wallet displays information about the identity of the Relying Party and the purpose, the user gives
    consent to present the (Q)EAA.
23. **JSON-LD W3C (Q)EAA** The wallet generates a W3C Verifiable Presentation containing one or more proofs using
    wallet/device private key(s)
24. **(SD-JWT (Q)EAA)** The Wallet generates a KB-JWT by signing over nonce and audience with *device private keyv*
25. **(SD-JWT (Q)EAA)** The Wallet creates the presentation according to presentation_definition by cutting out the
    unnecessary Disclosures and appending the KB-JWT
26. **(Mdoc (Q)EAA)** The Wallet generates an Mdoc deviceAuth by signing the SessionTranscript with *device private key*
27. **(Mdoc (Q)EAA)** The Wallet creates the presentation according to presentation_definition by cutting out the
    unnecessary Releases assembling the issuerAuth with deviceAuth
28. **JWT W3C VP** The wallet generates a W3C VCDM 1.1 JWT encoded Verifiable Presentation containing one or more proofs
    using wallet/device private key(s)
29. The wallet asks the user to authenticate, for instance using pin, face id or fingerprint
30. The wallet creates a VP token and a presentation submission, describing the paths from the definition to the VC(s)
    contained in the VP.
31. The wallet sends the VP token and presentation submission to the RP (encrypted to the RP's ephemeral public key, not
    yet supported).
32. The RP optionally decrypts the Authorization Response with its *ephemeral public key* created during the
    Authorization Request.
33. The RP matches the browser session with the state parameter.
34. The RP verifies the content of the vp_token. verifies its signatures, including these of credentials contained in
    presentation(s)
35. The RP verifies the submission_data and vp_token against its definition
36. The RP responds with HTTP 200 and acknowledges the received vp_token.
37. The browser refreshes the RP's website, either by polling regularly or by receiving a call from the RP, e.g. through
    websockets or webhooks.
38. The RP matches the session_id from the Cookie
39. matches this with the verification result.
40. Returns the result to the browser or RS
41. The browser continues the UX flow.


