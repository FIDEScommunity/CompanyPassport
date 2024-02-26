# Presentation Exchange

Whenever the `response_type` of the `Request Object` contains the value `vp_token`, `code` and
a `presentation_definition` is present, the OP/Wallet is expected to return a so called `VP Token`, meaning a Verifiable
Presentation in the `Authorization Response` (`vp_token`) or `Token Response` (`code`) with `presentation_submission`,
binding the Presentation to the definition. Examples will be provided below.

## Example JWT (Q)EAA

Below is an example (Q)EAA in JWT format, explaining how the JWT encoded (Q)EAA is being mapped onto the W3C Verifiable
Credential Datamodel 1.1 (VCDM).
It is important to understand that a JWT (Q)EAA is just a matter of encoding/decoding a 'regular' W3C Verifiable
Credential

```json
{
    "iss": "https://example.gov/issuers/565049", <-- Maps onto the issuer value of the W3C VDM
    "nbf": 1262304000, <-- Maps onto the issuance data of the W3C VDM
    "jti": "http://example.gov/credentials/3732", <-- Unique value, maps onto the credential Id of the W3C VDM
    "sub": "did:example:ebfeb1f712ebc6f1c276e12ec21", <-- maps onto the credentialSubject id of the W3C VDM, notice no id is present below,
    "vc": { <-- maps onto the W3C VCDM Verifiable Credential. The rest below is standard W3C VCDM,
       "crdentialSchema": {
          "id": "https://eu.com/claims/IDCredential.json"
       },
        "@context": [
            "https://www.w3.org/2018/credentials/v1",
            "https://www.w3.org/2018/credentials/examples/v1"
        ],
        "type": [
            "VerifiableCredential",
            "IDCredential"
        ],
        "credentialSubject": {
            "given_name": "Max",
            "family_name": "Mustermann",
            "birthdate": "1998-01-11",
            "address": {
                "street_address": "Sandanger 25",
                "locality": "Musterstadt",
                "postal_code": "123456",
                "country": "DE"
            }
        }
    }
}
```

## Example Presentation Definitions

As you can see in the below examples the format of the actual credential has an influence on the definition. Both in
terms of paths, formats and constraints

The global structure however is the same, and follows the DIF Presentation
Exchange [v2.0 specification](https://identity.foundation/presentation-exchange/spec/v2.0.0/) (PE)
The `input_descriptor` array is mandatory. A wallet is supposed to satisfy every single input descriptor from the
definition, unless specific constraints dictate otherwise.

Please be aware that the below are very minimal examples of what PE is capable of.
Things like defining which claims should be used in selectively disclosed credentials, including whether the selective
disclosure is mandatory or optional are for instance possible.
It is also possible to add constraints to an input descriptor, allowing for instance to assign one or more groups to the
descriptor. The in a so called `submission_requirements` object you can have rules, like a `pick` rule where you define
that for instance 1 or 2 descriptors should be satisfied from a certain group, or for instance a min and max amount of
descriptors

### W3C Verifiable Credential Data Model 1.1 JWT Credential

The below example, expects a JWT VP signed using `ES256` with a single JWT VC signed using either `ES256` or `ES256K`.
It also expect the type to be `IDCredential` exactly and requires a schema from 2 different locations.
```json
{
    "id": "example_jwt_vc, a unique ID value for the whole definition",
    "name": "An optional human friendly readable name, to be displayed by a wallet typically",
    "purpose": "An optional string to be displayed by the wallet, describing to the user that the purpose of the RPs data request is",
    "input_descriptors": [
        {
            "id": "id_credential", <-- A Unique identifier in the scope of the definition for this input descriptor
            "format": {
                "jwt_vc_json": {
                    "proof_type": [ <-- VC signature suites supported for a JWT VP not using Linked Data Processing (@context)
                        "ES256K",
                        "ES256"
                    ]
                },
               "jwt_vp_json": {
                  "proof_type": [
                     "ES256" <-- VP signature suite supported for a JWT VP not using Linked Data Processing (@context)
                  ]
               }
            },
            "constraints": {
                "fields": [
                    {
                        "path": [
                            "$.vc.type" <-- Search for this path in the credential, using JSONPath
                        ],
                        "filter": { <-- Can be any JSON schema filter, so partial searches using regexes, matching against constants, singular values as well as arrays
                            "type": "array",
                            "contains": {
                                "const": "IDCredential" <-- The VC path vc.type should be an array containing the string literal IDCredential with an exact match
                            }
                        }
                    },
                   {
                      "path": ["$.vc.credentialSchema.id"],
                      "filter": {
                         "type": "string",
                         "pattern": ["https://eu.com/claims/IDCredential.json", "https://us.com/example/US-IDCredential.json"]
                      }
                   }
                ]
            }
        }
    ]
}
```

### ISO mobile Driving License (mDL)

```json
{
   "id": "mDL-example, a unique ID value for the whole definition",
   "name": "An optional human friendly readable name, to be displayed by a wallet typically",
   "purpose": "An optional string to be displayed by the wallet, describing to the user that the purpose of the RPs data request is",
    "input_descriptors":[
        {
            "id":"org.iso.18013.5.1.mDL", <-- namespace identifier, according to ISO spec
            "format":{
                "mso_mdoc":{
                    "alg":[
                        "EdDSA",
                        "ES256"
                    ]
                }
            },
            "constraints":{
                "limit_disclosure":"required", <-- Do not accept mDoc disclosures containing more claims than listed below
                "fields":[
                    {
                        "path":[
                            "$['org.iso.18013.5.1']['family_name']"
                        ],
                        "intent_to_retain":false <-- The RP is signaling it will not store these values long term, only used during the actial interaction
                    },
                    {
                        "path":[
                            "$['org.iso.18013.5.1']['portrait']"
                        ],
                        "intent_to_retain":false
                    },
                    {
                        "path":[
                            "$['org.iso.18013.5.1']['driving_privileges']"
                        ],
                        "intent_to_retain":false
                    },
                    {
                        "path":[
                            "$['domestic_namespace']['domestic_data_element_id']"
                        ],
                        "intent_to_retain":false
                    }
                ]
            }
        }
    ]
}
```

## Presentation Submission

A descriptor called the `presentation_submission` needs to be provided in the Response to the RP. This descriptor is
being created by the Wallet and User. The Wallet will use a PE library to filter out any non-conforming (Q)EAAs. If the
Presentation Definition cannot be met, the user will be warned about it. If it can be met, the user will have to
consent. In case multiple (Q)EAAs met a single criteria (input_descriptor) of the definition, the user should choose
which (Q)EAA(s) to use.
The PE library then will generate the `presentation_submission`, making a link between the definition `input_descriptor`
ids and the JSONPaths of the (Q)EAAs in the Presentation. This ensures the RP can check the Presentation without any
ambiguity.

Example presentation submission:
```json
{
    "id": "Presentation example 1", <-- Unique value in scope of the holder/wallet
    "definition_id": "example_jwt_vc", <-- Matches the definition Id (see earlier)
    "descriptor_map": [
        {
            "id": "id_credential", <-- matches the ID of the descriptor from the definition
            "format": "jwt_vp", <-- Format used for the presentation
            "path": "$", <-- Since this is a nested descriptor where the outer part is the presentation at the toplevel, we use $ (toplevel)
            "path_nested": { <-- We need to point to the VC/(Q)EAA within the presentation
                "format": "jwt_vc", <-- format of the VC
                "path": "$.vp.verifiableCredential[0]" <-- Path to the (Q)EAA, relative to the path of the parent ($)
            }
        }
    ]
}
```
