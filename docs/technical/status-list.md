---
layout: page
url: /technical/status-list
title: Revocation
hero_height: is-fullwidth
---
# Statuslist

A StatusList allows you to revoke or suspend credentials at an individual level. This is possible by incorporating some
claims in every credential being issued, which has a descriptor pointing to the statuslist location (URI), as well
having an index within the statuslist. The statuslist itself is a simple bitstring, where every bit either is a 0 (the
default), or 1, meaning revoked or suspended, depending on the purpose of the statuslist. Some statuslist do not use a
single bit position, and can have multiple bits, for additional statuse.
If the purpose is revocation then it cannot be undone. If it is suspension then you can go from active to suspended and
back to active.

For StatusList2021, this index needs to be unique and random, to ensure external parties are not able to infer what
index would be related to newly issued credentials (herd privacy)
For example issuing a credential could receive index 12345 in the status list, whilst the next credential would get
index 93630.

Our solution can automatically assign these statuslist entries when issuing a credential. Managing the StatusList(s) and
revoking a credential is done using a separate REST API

## StatusList 2021
Spec: https://www.w3.org/TR/2023/WD-vc-status-list-20230427/

StatusList2021 is a pretty popular implementation in use today, however it has been superseded
by [BitString StatusList v1.0 (draft)](https://www.w3.org/TR/vc-bitstring-status-list/)
Most of the logic below however still applies. Both implementations are typically used with JSON-LD credentials, but
they just as well can be used in JWT credentials from VCDM 1.1

### Example Credential with StatusList2021 entry

The below example is a regular credential issued with a unique statusList index. Notice the additional credentialStatus
toplevel object.

```json
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/vc/status-list/2021/v1" <-- Required context containing the statuslist terms
  ],
  "id": "https://example.com/credentials/23894672394",
  "type": ["VerifiableCredential", "StatusList2021Entry"], <-- The 2nd type indicates this VC has a credentialStatus
  "issuer": "did:example:12345",
  "issued": "2021-04-05T14:27:42Z",
  "credentialStatus": {
    "id": "https://example.com/credentials/status/3#94567", <-- Unique ID containing the link to the statusListCredential with a fragment pointing to the index
    "type": "StatusList2021Entry", <-- Mandatory for StatusList2021
    "statusPurpose": "revocation", <-- either revocation or suspension, depending on statuslist purpose
    "statusListIndex": "94567", <-- unique number, randomly assigned during issuance
    "statusListCredential": "https://example.com/credentials/status/3" <-- Unique URL for the statusList
  },
  "credentialSubject": {
    "id": "did:example:6789",
    "type": "Person"
  },
  "proof": { ... }
}
```

### Example StatusList2021

The below example shows the actual statuslist. This list is made publicly available as a Verifiable Credential that can
be downloaded. Every credential issued using this statusList would have a URI pointing to this list.
The encodeList is the bitstring, which is gzip compressed and base64url encoded to save privacy.
The whole statusList is represented as Verifiable Credentials, so that Relying Parties can check/verify that the
statusList is signed by the issuer of a verifiable credential.
After every change of the statuslist a new version is published and thus signed by the issuer.
```json
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/vc/status-list/2021/v1" <-- Required context containing the statuslist terms
  ],
  "id": "https://example.com/credentials/status/3",
  "type": ["VerifiableCredential", "StatusList2021Credential"], <-- The 2nd type indicates this is a status list 2021
  "issuer": "did:example:12345",
  "issued": "2021-04-05T14:27:40Z",
  "credentialSubject": {
    "id": "https://example.com/status/3#list", <-- Unique ID of the statuslist, the list fragment is mandatory
    "type": "StatusList2021", <-- Type of statuslist
    "statusPurpose": "revocation", <-- Purpose. Can be revocation or suspension
    "encodedList": "H4sIAAAAAAAAA-3BMQEAAADCoPVPbQwfoAAAAAAAAAAAAAAAAAAAAIC3AYbSVKsAQAAA" <-- The encoded and compressed statusList
  },
  "proof": { ... }
}
```

### StatusList2021 Verification Process

A Wallet or Relying Party verifies the (Q)EAAs provided to them as part of a presentation. Next to regular signature and
schema checks it will also check the statusList if present

![](../assets/StatusList2021-verification.svg)


## OAuth Status List
spec: https://datatracker.ietf.org/doc/html/draft-ietf-oauth-status-list-00

The OAuth Status List has it roots in JWT/CWT credentials and is more suited for OAuth and thus OpenID scenario's. It
however uses very similar patterns as the StatusList2021/Bitstring statuslists

One of the big difference with StatusList 2021 is that there are up to 256 numeric values between 0 and 255. Where there
are also predefined statuses : - 0x00 - "VALID" - The status of the Token is valid, correct or legal. - 0x01 - "
INVALID" - The status of the Token is revoked, annulled, taken back, recalled or cancelled. This state is
irreversible. - 0x02 - "SUSPENDED" - The status of the Token is temporarily invalid, hanging, debarred from privilege.
This state is reversible. In order to support these different values the issuer must define the bits size in the StatusList.

### Example Credential with JWT Status entry

The below example is a regular credential issued with a unique statusList index. Notice the additional `status`
toplevel object.

```json
{
  "alg": "ES256",
  "kid": "11"
}
.
{
  "iss": "https://example.com",
  "status": {
    "idx": 1234, <-- numeric value that represents the index to check for status information in the Status List
    "uri": "https://example.com/statuslists/1" <-- The StatusList URI (it can be downloaded at this location)
  },
  "vc": {
    .....
  }
}
```

### Example JWT StatusList

The below example shows the actual JWT statuslist. This list is made publicly available as a JWT that can
be downloaded. Contrary to the StatusList2021 statuslist it thus isn't a VC itself. However since the JWT is signed it still can simply be validated using regular libraries.
Every credential issued using this statusList would have a URI pointing to this list.
The `lst` is the bitstring, which is gzip compressed and base64url encoded to save privacy.
After every change of the statuslist a new version is published and thus signed by the issuer.
```json
{
  "alg": "ES256", <-- The algorithm used
  "kid": "12", <-- The key identifier of the issuer (used to sign the JWT)
  "typ": "statuslist+jwt" <-- Indicated this is a statuslist in JWT format 
}
.
{
  "exp": 2291720170, <-- Optional expiration time of the statuslist, handy for cache evictions for instance
  "iat": 1686920170, <-- Issuance time of the statuslist
  "iss": "https://example.com", <-- Issuer of the statuslist. Must be the same as the `iss` value of the JWT VC
  "status_list": {
    "bits": 2, <-- number of bits per Referenced Token in the Status List ("lst", which is 1, 2, 4 or 8)
    "lst": "H4sIAOpbjGQC_zvp8hMAZLRLMQMAAAA" <-- The encoded and compressed statusList
  },
  "sub": "https://example.com/statuslists/1" <!-- The status list identifier itself. Must match the `uri` value in the `status` object of the JWT VC
}
```



**TODO: Explain other StatusLists implementations**
