---
layout: page
title: Use Case
---

## Organization structure

```mermaid
flowchart TD;
  Person_A--> |100% shareholder| Holding_A;
  Person_B--> |100% shareholder| Holding_B;
  Person_C--> |100% shareholder| Holding_C;
  Holding_A--> |1/3 shareholder| Operating_company;
  Holding_B--> |1/3 shareholder| Operating_company;
  Holding_C--> |1/3 shareholder| Operating_company;
```
## Scope Use Case

### Operating_company 
  - Has an organisational wallet
  - Has 3 independently authorised directors:
    - Holding A
    - Holding B
    - Holding C
  - Has 3 shareholders:
     - 1/3 Holding A
     - 1/3 Holding B
     - 1/3 Holding C
### Holding A
  - Has an organisational wallet
  - Has 1 independently authorised director:
    - Person A
  - Has 1 100% shareholder
    - Person A
### Person A
  - Has a personal wallet
### Holding B
  - Has an organisational wallet
  - Has 1 independently authorised director:
    - Person B
  - Has 1 100% shareholder
    - Person B
### Person B
  - Does not have a personal wallet
  - Has an eIDAS High Digital Identity
### Holding C
  - Does not have an organizational wallet
  - Has 1 independently authorized director:
    - Person C
  - Has 1 100% shareholder
    - Person C
### Person C
  - Does not have a personal wallet
  - Has an eIDAS High Digital Identity

## Flow use case Horizon 1

### PID Issuance to Holding A
```mermaid
sequenceDiagram
    participant Person A
    participant Holding A
    
    participant Issuer
    participant Chamber of Commerce

    Person A->>Holding A: Contracts an Organisational Wallet
    activate Holding A

    Note Right of Holding A: Wallet status: Operational
   

    Person A-->>Holding A: Request A Legal-PID
    
    Holding A->>Issuer: Request Legal-PID
    Issuer->>Holding A: What is your Legal Identifier (nl: KVK Number)
    Holding A-->>Issuer: [Legal Identifier]
    Issuer->>Chamber of Commerce:Request Business Extract Holding A with [Legal Identifier]
    Chamber of Commerce->>Issuer: Business extract of Holding A with [Legal Identifier]
    

    Issuer->>Person A: Request to Authorize as authorised director

    activate Person A
    Person A->>Issuer: Grants Authorization
    deactivate Person A
    Issuer->>Holding A:Issues PID
    activate Holding A
    Note Right of Holding A: Wallet status: Valid
    deactivate Holding A
    deactivate Holding A
```

### PID Issuance to Operating Company
```mermaid
sequenceDiagram
    participant Person A
    participant Holding A
    participant Operating Company
    participant Issuer
    participant Chamber of Commerce
    activate Holding A
    Note Right of Holding A: Wallet status: Valid
    
    Person A->>Operating Company: Contracts an Organisational Wallet
    Note Right of Operating Company: Wallet status: Operational
    activate Operating Company


    Person A-->>Holding A: Request A Legal-PID for Operating Company
    
    
    Holding A->>Issuer: Request Legal-PID
    Holding A-->>Operating Company: Request a Legal-PID 
    Operating Company-->>Issuer: Request for a Legal-PID
    Issuer->>Operating Company: What is your Legal Identifier (nl: KVK Number)
    Operating Company-->>Issuer: [Legal Identifier]
    Issuer->>Chamber of Commerce:Request Business Extract Holding A with [Legal Identifier]
    Chamber of Commerce->>Issuer: Business extract of Holding A with [Legal Identifier]

    Issuer->>Holding A: What is your Legal Identifier (nl: KVK Number)
    Holding A-->>Issuer: [Legal Identifier]
    Issuer->>Chamber of Commerce:Request Business Extract Holding A with [Legal Identifier]
    Chamber of Commerce->>Issuer: Business extract of Holding A with [Legal Identifier]
    

    Issuer->>Person A: Request to Authorize as authorised director

    activate Person A
    Person A->>Issuer: Grants Authorization
    deactivate Person A
    Issuer->>Operating Company:Issues PID
    activate Operating Company
    Note Right of Operating Company: Wallet status: Valid
    deactivate Holding A
    deactivate Operating Company
    deactivate Operating Company
```


