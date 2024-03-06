---
layout: page
title: Credential Types
---

Below an overview of verifiable credentials that are required during the founding of a
private limited liability company in the Netherlands (“BV”). This list may not be
exhaustive. The Architecture WG will not define the details of the data models
(schemes) for each of these credentials. A generic json schema file is assumed for
each of the credentials. The Company Passport Trust Framework Working Group is
provide data models for the various credentials.

### Incorporation Deed

“Oprichtingsakte” in Dutch. Company representatives present statutes to a
notary, who verifies stakeholder identities and statutes legality, then issues the
deed of incorporation, formalizing company establishment.

### Chamber of Commerce Number

“KVK nummer” in Dutch. Incorporation documents are provided to the
Chamber of Commerce (KVK), which verifies and approves these documents,
issuing a company registration number and formally registering the company.

### RSIN

An identification number for legal entities and partnerships issued by the
Dutch Chamber of Commerce to a legal entity. The RSIN is automatically
provided to the Dutch Tax Office who uses the RSIN to generate other
identifiers. Not all Dutch legal entities get an RSIN For instance sole
proprietorship (“eenmanszaak”).

### VAT ID

In Dutch “BTW ID”. The company applies for tax identification and VAT
registration with the Tax Authority (Belastingdienst), which verifies the
company&#39;s legal status and tax eligibility to ensure national tax regulation
compliance.
#### Bank Account Number

The company approaches a bank to open a business account, necessary for
financial transactions. The bank conducts KYC and AML checks to ensure
financial regulation compliance before account creation. During this KYC and
AML checks above mentioned (re-usable) verifiable credentials are requested
acting as legitimate proof of checks already done by other trusted parties.
