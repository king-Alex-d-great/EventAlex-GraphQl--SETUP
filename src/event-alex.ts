import { BigInt, Address, ipfs, json } from "@graphprotocol/graph-ts"
import {
  EventAlex,
  ConfirmedAttendee,
  DepositsPaidOut,
  NewEventCreated,
  NewRSVP,
  confirmAttendees
} from "../generated/EventAlex/EventAlex"
import { Account, RSVP, Confirmation, Event } from "../generated/schema"
import { integer } from "@protofire/subgraph-toolkit"

export function handleConfirmedAttendee(event: ConfirmedAttendee): void {



}

export function handleDepositsPaidOut(event: DepositsPaidOut): void {

}

export function handleNewEventCreated(event: NewEventCreated): void {

  

  let newEvent = Event.load(event.params.eventID.toHex());

  if (newEvent == null) {
    newEvent = new Event(event.params.eventID.toHex());
    newEvent.eventID = event.params.eventID;
    newEvent.eventOwner = event.params.creatorAddress;
    newEvent.eventTimestamp = event.params.eventTimestamp;
    newEvent.maxCapacity = event.params.maxCapacity;
    newEvent.deposit = event.params.deposit;
    newEvent.paidOut = false;
    newEvent.totalConfirmedAttendees = integer.ZERO;
    newEvent.totalRSVPs = integer.ZERO;
    newEvent.save();
  }

}

export function handleNewRSVP(event: NewRSVP): void {
  
  let id = event.params.eventID.toHex() + event.params.attendeeAddress.toHex();
  let rsvp = RSVP.load(id);

  let _event = Event.load(event.params.eventID.toHex());

  if (rsvp == null && _event != null) {
    let account = getOrCreateAccount(event.params.attendeeAddress);

    rsvp = new RSVP(id);

    rsvp.attendee = account.id;
    rsvp.event = _event.id;
    rsvp.save();

    _event.totalRSVPs = integer.increment(_event.totalRSVPs);
    _event.save();

    account.totalRSVPs = integer.increment(account.totalRSVPs);
    account.save();
  }
}

function getOrCreateAccount(address: Address): Account {
  let account = Account.load(address.toHex());

  if (account == null) {
    account = new Account(address.toHex());

    account.totalAttendedEvents = integer.ZERO;
    account.totalRSVPs = integer.ZERO;
    account.save();
  }

  return account;
}

export function handleconfirmAttendees(event: confirmAttendees): void {

 
  let id = event.params.eventId.toHex() + event.params.attendee.toHex();

  let rsvp = RSVP.load(id);
  let confirm = Confirmation.load(id);

  if (confirm == null && rsvp != null) {
    let _event = Event.load(event.params.eventId.toHex());

    if (_event != null) {
      confirm = new Confirmation(id);

      confirm.attendee = event.params.attendee.toHex();
      confirm.event = _event.id;
      confirm.save();

      _event.totalConfirmedAttendees = integer.increment(_event.totalConfirmedAttendees);
      _event.save();

      let account = Account.load(event.params.attendee.toHex());

      if (account != null) {
        account.totalAttendedEvents = integer.increment(account.totalAttendedEvents);
        account.save();
      }
    }


  }


}
