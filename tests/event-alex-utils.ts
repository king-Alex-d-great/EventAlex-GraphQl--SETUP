import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  ConfirmedAttendee,
  DepositsPaidOut,
  NewEventCreated,
  NewRSVP,
  confirmAttendees
} from "../generated/EventAlex/EventAlex"

export function createConfirmedAttendeeEvent(
  eventID: BigInt,
  attendeeAddress: Address
): ConfirmedAttendee {
  let confirmedAttendeeEvent = changetype<ConfirmedAttendee>(newMockEvent())

  confirmedAttendeeEvent.parameters = new Array()

  confirmedAttendeeEvent.parameters.push(
    new ethereum.EventParam(
      "eventID",
      ethereum.Value.fromUnsignedBigInt(eventID)
    )
  )
  confirmedAttendeeEvent.parameters.push(
    new ethereum.EventParam(
      "attendeeAddress",
      ethereum.Value.fromAddress(attendeeAddress)
    )
  )

  return confirmedAttendeeEvent
}

export function createDepositsPaidOutEvent(eventID: BigInt): DepositsPaidOut {
  let depositsPaidOutEvent = changetype<DepositsPaidOut>(newMockEvent())

  depositsPaidOutEvent.parameters = new Array()

  depositsPaidOutEvent.parameters.push(
    new ethereum.EventParam(
      "eventID",
      ethereum.Value.fromUnsignedBigInt(eventID)
    )
  )

  return depositsPaidOutEvent
}

export function createNewEventCreatedEvent(
  eventID: BigInt,
  creatorAddress: Address,
  eventTimestamp: BigInt,
  maxCapacity: BigInt,
  deposit: BigInt
): NewEventCreated {
  let newEventCreatedEvent = changetype<NewEventCreated>(newMockEvent())

  newEventCreatedEvent.parameters = new Array()

  newEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "eventID",
      ethereum.Value.fromUnsignedBigInt(eventID)
    )
  )
  newEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "creatorAddress",
      ethereum.Value.fromAddress(creatorAddress)
    )
  )
  newEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "eventTimestamp",
      ethereum.Value.fromUnsignedBigInt(eventTimestamp)
    )
  )
  newEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "maxCapacity",
      ethereum.Value.fromUnsignedBigInt(maxCapacity)
    )
  )
  newEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "deposit",
      ethereum.Value.fromUnsignedBigInt(deposit)
    )
  )

  return newEventCreatedEvent
}

export function createNewRSVPEvent(
  eventID: BigInt,
  attendeeAddress: Address
): NewRSVP {
  let newRsvpEvent = changetype<NewRSVP>(newMockEvent())

  newRsvpEvent.parameters = new Array()

  newRsvpEvent.parameters.push(
    new ethereum.EventParam(
      "eventID",
      ethereum.Value.fromUnsignedBigInt(eventID)
    )
  )
  newRsvpEvent.parameters.push(
    new ethereum.EventParam(
      "attendeeAddress",
      ethereum.Value.fromAddress(attendeeAddress)
    )
  )

  return newRsvpEvent
}

export function createconfirmAttendeesEvent(
  eventId: BigInt,
  attendee: Address
): confirmAttendees {
  let confirmAttendeesEvent = changetype<confirmAttendees>(newMockEvent())

  confirmAttendeesEvent.parameters = new Array()

  confirmAttendeesEvent.parameters.push(
    new ethereum.EventParam(
      "eventId",
      ethereum.Value.fromUnsignedBigInt(eventId)
    )
  )
  confirmAttendeesEvent.parameters.push(
    new ethereum.EventParam("attendee", ethereum.Value.fromAddress(attendee))
  )

  return confirmAttendeesEvent
}
