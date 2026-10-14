export const situations = [
  {
    t: 'The builder has delayed possession, or I want my money back',
    area: 'rera',
    h: 'RERA Rajasthan, or a consumer commission',
    steps: [
      ['Check the project\'s RERA registration', 'On the RERA Rajasthan website, using the registration number in your agreement.'],
      ['Complaint before RERA Rajasthan', 'As provided under the RERA Act, the allottee may seek return of the amount paid with interest, or interest for every month of delay if they stay in the project.'],
      ['Compensation, if claimed', 'Decided by the Adjudicating Officer, as provided under the Act.'],
      ['Alternative forum', 'A consumer complaint before the District or State Commission remains available.']
    ]
  },
  {
    t: 'I want to challenge an order passed by RERA',
    area: 'rera',
    h: 'Rajasthan Real Estate Appellate Tribunal',
    steps: [
      ['Appeal to the Appellate Tribunal', 'Within 60 days of receiving the order, as provided under the Act. Delay can be condoned for sufficient cause.'],
      ['Pre-deposit for promoters', 'A promoter must deposit the amount required under the Act before the appeal is heard.'],
      ['Second appeal', 'To the High Court within 60 days of the Tribunal\'s decision, as provided under the Act.']
    ]
  },
  {
    t: 'A government department or authority has passed an order against me',
    area: 'highcourt',
    h: 'Rajasthan High Court, Jaipur Bench: writ petition',
    steps: [
      ['Check for an alternative remedy', 'Where the law provides an appeal or revision, the High Court ordinarily expects it to be used first.'],
      ['Representation, where useful', 'A written representation to the authority builds the record and sometimes resolves the matter.'],
      ['Writ petition under the Constitution', 'Against action of the State, a development authority or another public body, with a stay application if interim relief is needed. There is no fixed limitation, but unexplained delay can defeat the petition.'],
      ['Reply and hearing', 'Notice is issued to the respondents, replies are filed and the petition is heard. An order of a single judge can be taken in special appeal to a Division Bench.']
    ]
  },
  {
    t: 'I need to approach the High Court in another matter: an FIR, bail, or an order of a lower court',
    area: 'highcourt',
    h: 'Rajasthan High Court: miscellaneous petitions',
    steps: [
      ['Quashing of an FIR or proceedings', 'A criminal miscellaneous petition invoking the inherent powers of the High Court under the Bharatiya Nagarik Suraksha Sanhita, 2023.'],
      ['Bail and anticipatory bail', 'Bail and anticipatory bail applications, as provided under the Bharatiya Nagarik Suraksha Sanhita. The Sessions Court is ordinarily approached first.'],
      ['Orders of trial courts and tribunals', 'A petition under the supervisory jurisdiction of the High Court, a civil revision or a civil miscellaneous appeal, depending on the order.'],
      ['Transfer and other applications', 'Transfer of cases and other applications that the High Court hears.']
    ]
  },
  {
    t: 'A business or company owes me money, or a commercial contract has been broken',
    area: 'commercial',
    h: 'Commercial Court, or arbitration if the contract provides for it',
    steps: [
      ['Check the contract for an arbitration clause', 'If there is one, the dispute ordinarily goes to arbitration under the Arbitration and Conciliation Act, 1996.'],
      ['Pre-institution mediation', 'Required under the Commercial Courts Act, 2015 before a suit is filed, unless urgent interim relief is sought.'],
      ['Commercial suit', 'Before the Commercial Court where the specified value is ₹3 lakh or more. A summary suit under the Code of Civil Procedure may be available for claims on written contracts or negotiable instruments.'],
      ['Strict timelines', 'The defendant has 30 days to file a written statement, extendable only up to 120 days from service of summons.']
    ]
  },
  {
    t: 'A dispute over property, possession or an injunction',
    area: 'civil',
    h: 'Civil court: Civil Judge or Additional District Judge',
    steps: [
      ['Collect title and possession documents', 'Sale deed, mutation, allotment letter, site plan and tax receipts, as applicable.'],
      ['Civil suit', 'For declaration, permanent injunction, possession, partition or specific performance. The court depends on the value of the suit.'],
      ['Temporary injunction', 'An application under the Code of Civil Procedure to keep matters as they are while the suit is pending.'],
      ['Limitation', 'Periods differ by relief: for example three years for most declarations and twelve years for possession based on title. Delay in filing a suit cannot be condoned.']
    ]
  },
  {
    t: 'Someone owes me money (not a business dispute)',
    area: 'civil',
    h: 'Civil court: suit for recovery',
    steps: [
      ['Legal notice', 'A demand notice is usual before filing, though not always required.'],
      ['Suit for recovery', 'Ordinarily within three years of the date the amount became payable.'],
      ['Summary suit', 'Under the Code of Civil Procedure, where the claim is on a written contract, a bill of exchange or a cheque, the defendant must take leave to defend.']
    ]
  },
  {
    t: 'My tenant will not vacate or has stopped paying rent',
    area: 'tenancy',
    h: 'Rent Tribunal under the Rajasthan Rent Control Act, 2001',
    steps: [
      ['Check the tenancy documents', 'Rent agreement, receipts, and the grounds for eviction that apply.'],
      ['Petition before the Rent Tribunal', 'For eviction and arrears of rent.'],
      ['Appeal', 'Before the Appellate Rent Tribunal.']
    ]
  },
  {
    t: 'A cheque given to me was returned unpaid',
    area: 'cheque',
    h: 'Magistrate court, under the Negotiable Instruments Act',
    steps: [
      ['Demand notice', 'Within 30 days of the bank\'s information about the dishonour.'],
      ['Wait for payment', 'The drawer has 15 days from receiving the notice to pay.'],
      ['Complaint', 'Within one month after the 15 days end without payment.']
    ]
  },
  {
    t: 'My insurance claim was rejected or delayed',
    area: 'insurance',
    h: 'Consumer commission, civil court or MACT',
    steps: [
      ['Collect the policy and the repudiation letter', 'The insurer\'s stated reason shapes the case.'],
      ['Choose the forum', 'A consumer complaint for deficiency in service, a civil suit, or the MACT where a motor accident claim is involved.']
    ]
  },
  {
    t: 'A promotion, seniority or disciplinary issue in government service',
    area: 'service',
    h: 'Rajasthan High Court, or a service tribunal first',
    steps: [
      ['Departmental remedies', 'Representations or departmental appeals, where the rules provide them.'],
      ['Tribunal, for some state posts', 'The Rajasthan Civil Services Appellate Tribunal hears certain matters of state employees.'],
      ['Writ petition', 'Before the Rajasthan High Court, Jaipur Bench.']
    ]
  },
  {
    t: 'The bank has issued a SARFAESI notice or taken possession',
    area: 'banking',
    h: 'Debts Recovery Tribunal',
    steps: [
      ['Reply to the demand notice', 'A representation or objection to the bank, as provided under the SARFAESI Act.'],
      ['Securitisation application', 'Before the DRT, as provided under the SARFAESI Act, within 45 days of the measure taken by the bank.']
    ]
  },
  {
    t: 'I am buying a plot, flat or commercial property',
    area: 'nonlitigation',
    h: 'No court: title verification and documentation',
    steps: [
      ['Title search', 'Tracing the chain of ownership and checking encumbrances.'],
      ['Legal opinion and due diligence', 'Approvals, conversion, JDA records and RERA registration where relevant.'],
      ['Documents and registration', 'Agreement to sell, sale deed and registration.']
    ]
  },
  {
    t: 'I lost money to an online fraud',
    area: 'cyber',
    h: 'Cyber police first, then the criminal courts',
    steps: [
      ['Report at once', 'Call the national cyber crime helpline 1930 or file at cybercrime.gov.in, and inform your bank.'],
      ['FIR and investigation', 'Police investigation under the IT Act and criminal law.'],
      ['Court proceedings', 'Bail, trial and evidence before the criminal courts.']
    ]
  }
]
