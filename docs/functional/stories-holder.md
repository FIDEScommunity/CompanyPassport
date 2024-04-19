---
layout: page
title: User Stories - Holder
hero_height: is-fullwidth
---

> NOTE: For now combined, but will be spilt up into issuer-holder-verifier
> TODO: for each user story add a Title, Number, Description.

| User Story                                       |
| ------------------------------------------------ |
| [A.1 Request Attestation](#a1-receive-attestion) |

Some notes on the user stories:
- All stories currently use "user" as the persona. There are likely a few roles that we can define, independent on the individual permissions that are required for certain tasks. To not go too meta (user can configure which users can configure to do ...). So these should likely be split up into user and admin. By default an admin can do almost everything, and users can by default do almost nothing. Users can be given permissions to do certain things. Additional stories can be added based on roles, so it's easier to have a group of users that can do certain things.
- Each category of user stories has an authorization section that details which types of authorizations are required to perform the actions described in the user stories.
- All user stories are currently high level. There is benefit to working them out in more detail, but it can become redundant. It may be better to catch this in use cases, where there is more detail on the exact specifications or frameworks need to be followed. E.g. "receiving an Attestation" sounds simple, but can be split up into a lot of use cases, such as "Retrieving the Issuer Metadata", "Verifying the Issuer against a Trust List", "Authorizing to the issuer's authorization server", etc.. This should come after the user stories are defined, and can be used to define the exact requirements for the system. 
  - It would be good to good one level deeper on the user stories on which specifications, ecosystems, regulations or frameworks need to be followed. So "As a user I can receive an SD-JWT credential from an OID4VCI issuer so that ..." and "As a user I can receive an mDOC credential from an OID4VCI issuer so that ...". These are different user stories, with both their own complexities and underlying use cases.
- All terms used here (often with Capital letter) are based on the [Glossary](../glossary.md) and the definitions from the Architecture Reference Framework (also linked in the glossary).

### A. Requesting Attestations

### A.1 Request Attestation - Wallet Initiated

As a user I want to receive an Attestation on behalf of the Legal Entity in the Organizational Wallet, so that the Legal Entity and any of it's representatives can use the Attestation in the future.

### A.4 Request Attestation - Issuer Initiated

As a user I want to request an Attestation to be issued to the Organizational Wallet on behalf of the Legal Entity from an Attestation Provider.

--- 

2. As a user I want to view the Attributes of an Attestation in the Organizational Wallet, so that I can check certain details of the Attestation such as the issuance date, the verification date, the revocation state, and other attributes.
3. As a user I want to renew an Attestation on behalf of the Legal Entity in the Organizational Wallet, so that Attestations that are revoked, expired, or otherwise invalid can be renewed.

5. As a user I want to be able to remove an Attestation from the Organizational Wallet, so that Attestations that are no longer needed can be removed.

#### A.A Authorization

1. As a user I want to limit which representatives of the Legal Entity can receive Attestations on behalf of the Legal Entity, so that only authorized representatives can receive Attestations.
2. As a user I want to limit which representatives of the Legal Entity can view the Attributes of Attestations in the Organizational Wallet, so that only authorized representatives can view the Attributes of Attestations.
3. As a user I want to limit which representatives of the Legal Entity can remove Attestations from the Organizational Wallet, so that only authorized representatives can remove Attestations.

### B Presenting Attestations

#### B.1 Present Attestation

> TODO: update to 'react to request for data'.
As a user I want to present one or more Attestation(s) in the Organizational Wallet on behalf of the Legal Entity to a Relying Party, so that the Legal Entity and any of it's representatives can prove certain Attributes about the Legal Entity or it's representatives.

#### B.A Authorization

1. As a user I want to limit which representatives of the Legal Entity can present Attestations on behalf of the Legal Entity, so that only authorized representatives can present Attestations.
2. As a user I want to limit which representatives of the Legal Entity can present certain types of Attestations, so that only authorized representatives can present certain types of Attestations.

### C Issuing Attestations

1. As a user I want to issue an "Legal Entity Representative Attestation" to a personal wallet of a representative of the Legal Entity so that the representative can authenticate to the Organizational Wallet on behalf of the Legal Entity.
2. As a user I want to issue an EAA Attestation to another wallet on behalf of the Legal Entity.
3. As a user I want to configure pre-defined Attestations that can be issued by the Organizational Wallet, so that only certain types of Attestations can be issued by the Organizational Wallet.
4. As a user I want to revoke an issued Attestation, so that the Attestation is no longer valid.
5. As a user I want to configure auto-renewal of Attestations issued to external wallets, so that Attestations are automatically renewed when they are about to expire.

#### C.A Authorization

1. As a user I want to limit which representatives of the Legal Entity can issue Attestations on behalf of the Legal Entity, so that only authorized representatives can issue Attestations.
2. As a user I want to limit which types of Attestations can be issued by which representatives of the Legal Entity, so that only authorized representatives can issue certain types of Attestations. 
3. As a user I want to limit which representatives of the Legal Entity can create pre-defined Attestations, so that only authorized representatives can create pre-defined Attestations.

### D Verifying Attestations

1. As a user I want to act as a Relying Party and request one or more Attestation(s) from an external wallet to be presented to the Organizational Wallet, so that I can verify certain Attributes about an external credential holder.

#### D.A Authorization

1. As a user I want to limit which representatives of the Legal Entity can verify Attestations on behalf of the Legal Entity, so that only authorized representatives can verify Attestations.
1. As a user I want to limit which types of Attestations can be verified by which representatives of the Legal Entity, so that only authorized representatives can verify certain types of Attestations. 
1. As a user I want to limit which representatives of the Legal Entity can create pre-defined Attestation verifications, so that only authorized representatives can create pre-defined Attestation verifications.

### E. Authenticating

1. As a user I want to authenticate to the Organizational Wallet using an "Legal Entity Representative Attestation" so that I can access the Organizational Wallet on behalf of the Legal Entity.
2. As a user I want to authenticate to the Organizational Wallet using traditional SAML/SSO authentication methods, so that I can access the Organizational Wallet on behalf of the Legal Entity using existing infrastructure.

### F. Audit

1. As a user I want to view the audit log of the Organizational Wallet, so that I can see which actions have been performed by which representatives of the Legal Entity.

#### F.A. Authorization

1. As a user I want to limit which representatives of the Legal Entity can view the audit log of the Organizational Wallet, so that only authorized representatives can view the audit log.

### Use Case Specific User Stories

This section lists user stories that are specific to the use case of founding a new "Besloten Vennootschap" (BV), a Dutch private limited liability company (Ltd.). Most of these user stories can be handled by the general user stories defined above, but are to show the general requirements cover the use case specific requirements as well.

1. As a user I want to receive an OprichtingsAkte Attestation from a notary on behalf of the Legal Entity in the Organizational Wallet, so that the Legal Entity and any of it's representatives can use the OprichtingsAkte Attestation in the future.
2. As a user I want to present an OprichtingsAkte Attestation in the Organizational Wallet on behalf of the Legal Entity to the Dutch Chamber of Commerce (KvK), so that the Dutch Chamber of Commerce can verify that the Legal Entity ...?
4. As a user I want to receive an Uitreksel Attestation from the Dutch Chamber of Commerce (KvK) on behalf of the Legal Entity in the Organizational Wallet, so that the Legal Entity and any of it's representatives can use the Uitreksel Attestation in the future.
5. As a user I want to receive an RSIN Attestation from the Dutch Chamber of Commerce (KvK) on behalf of the Legal Entity in the Organizational Wallet, so that the Legal Entity and any of it's representatives can use the Uitreksel Attestation in the future.
  - RSIN attributes may also be part of Uitreksel Attestation
6. As a user I want to present an Uitreksel Attestation in the Organizational Wallet on behalf of the Legal Entity to the Dutch Tax Authority, so that the Dutch Tax Authority can verify that the Legal Entity is registered at the Dutch Chamber of Commerce (KvK).
6. As a user I want to receive an "VAT ID" Attestation from the Dutch Tax Authority (Belastingdienst) on behalf of the Legal Entity in the Organizational Wallet, so that the Legal Entity and any of it's representatives can use the "VAT ID" (Belastingdienst) Attestation in the future.
7. As a user I want to present an Uitreksel Attestation in the Organizational Wallet on behalf of the Legal Entity to an accredited Dutch bank, so that the accredited dutch bank can verify that the Legal Entity is registered at the Dutch Chamber of Commerce (KvK).
8. As a user I want to receive an "Bank Account" Attestation from a accredited Dutch bank on behalf of the Legal Entity in the Organizational Wallet, so that the Legal Entity and any of it's representatives can use the "Bank Account" Attestation in the future.

## Non Functional Requirements

This section lists the non-functional requirements for the Organizational Wallet (some may be more technical requirements and extracted later).

- 24/7 availability
- Try to align with DIIP and ARF (where possible)
- Credentials must be able to be linked to a hardware backed cryptographic key