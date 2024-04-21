---
layout: page
title: User Stories
hero_height: is-fullwidth
---

The user stories for the Organizational Wallet are separated into four categories:
- [User Stories - Holder](./stories-holder) - For receiving and presenting Attestations in the Organizational Wallet 
- [User Stories - Issuer](./stories-issuer) - For issuing Attestations from the Organizational Wallet
- [User Stories - Verifier](./stories-verifier) - For requesting and verifying Attestions from external wallets
- [User Stories - General](#general-user-stories) - General user stories not tied to a specific role.

## Non Functional Requirements

This section lists the non-functional requirements for the Organizational Wallet (some may be more technical requirements and extracted later).

- 24/7 availability
- Try to align with DIIP and ARF (where possible)
- Attestations must be able to be linked to a hardware backed cryptographic key

## Actors

The user stories use certain actors in their descriptions. When such an actor is used within a user story, it should use the contstrains for that actor as described in the the following list of actors. This helps reduce redundancy in user story descriptions.

### Authorized Representative

An Authorized Representative is a natural person that has access to the Organizational Wallet and is authorized to act on behalf of the Legal Entity (possibly indirectly through other Legal Entities). In the current version of the company passport specifications, an Authorized Representative always has full power of attorney to make decisions on behalf of the legal entity.

## General User Stories

| User Story                                                                                           |
| ---------------------------------------------------------------------------------------------------- |
| [G.1 View Audit Log](#g1-view-audit-log)                                                             |
| [G.2 View Audit Log for Attestation](#g2-view-audit-log-for-attestation)                             |
| [G.3 Authenticate using SAML/SSO](#g3-authenticate-using-samlsso)                                    |
| [G.4 Access Wallet - Web Portal](#g4-access-wallet---web-portal)                                     |
| [G.5 Store Contact](#g5-store-contact)                                                               |
| [G.6 Initializing Organizational Wallet](#g6-initializing-organizational-wallet)                     |
| [G.7 Configure and View Organizational Identifier](#g7-configure-and-view-organizational-identifier) |


### G.1 View Audit Log

As an Authorized Representative I want to view the audit log of the Organizational Wallet, so that I can see which actions have been performed by which actors within the system.

### G.2 View Audit Log for Attestation

As an Authorized Representative I want to view the audit log of a specific Attestation, so that I can see which actions have been performed by which actors within the system for a specific Attestation.

### G.3 Authenticate using SAML/SSO

As an Authorized Representative I want to authenticate to the Organizational Wallet using SAML/SSO authentication methods, so that I can access the Organizational Wallet on behalf of the Legacy Entity using existing infrastructure.

### G.4 Access Wallet - Web Portal

As an Authorized Representative I want to access the Organizational Wallet though a web UI interface, so that I can manually represent the Legal Entity.

### G.5 Store Contact

As an Authorized Representative I want to store the cryptogrpahic identifiers of an external parties I interact with through the Organizationl Walelt as a contact within the Organizational Wallet, to increase trust and so that future interactions with the external party are automatically linked to the existing contact.

### G.6 Initializing Organizational Wallet

> TODO: Need to get more clarity what initializing a new organizational wallet entails.

As an Authorized Representative I want to initialize a new organizational wallet

### G.7 Configure and View Organizational Identifier

As an Authorized Representative I want to configure and view the cryptographic identifier that is used within the Organizational Wallet for issuing, receiving, presenting and verifying Attestations, so that external parties can verify the interactions with the Organizational Wallet are with representatives of the Legal Entity.