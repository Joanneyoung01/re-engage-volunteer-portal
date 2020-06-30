class Contact extends React.Component {
  constructor() {
    super();
    this.state = {
      message: "test message: success/fail add member",
      drivers: [],
      guests: [],
      member: {},
    };
  }

  componentDidMount() {
    this.fetchDrivers("/drivers");
    this.fetchGuests("/guests");
  }

  fetchDrivers = () => {
    fetch("/drivers")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          drivers: data,
        });
        this.setState({
          drivers: this.sortDriversAtoZ(),
        });
      });
  };

  fetchGuests = () => {
    fetch("/guests")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          guests: data,
        });
        this.setState({
          guests: this.sortGuestsAtoZ(),
        });
      });
  };

  mySubmitHandler = (event) => {
    event.preventDefault();
    let newMember = {
      name: this.state.name,
      role: this.state.role,
      address: this.state.address,
    };

    fetch("/createMember", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMember),
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          message: "Success!",
        });
      });

    fetch("/drivers")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          drivers: data,
        });
        this.setState({
          drivers: this.sortDriversAtoZ(),
        });
      });

    fetch("/guests")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          guests: data,
        });
        this.setState({
          guests: this.sortGuestsAtoZ(),
        });
      });
  };

  deleteDriver = (event) => {
    event.preventDefault();
    var member = {
      id: event.target.dataset.id,
    };

    fetch("/deleteMember", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(member),
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          message: "Success!",
        });
      });

    fetch("/drivers")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          drivers: data,
        });
        this.setState({
          drivers: this.sortDriversAtoZ(),
        });
      });
  };

  deleteGuest = (event) => {
    event.preventDefault();
    var member = {
      id: event.target.dataset.id,
    };

    fetch("/deleteMember", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(member),
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          message: "Success",
        });
      });

    fetch("/guests")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          guests: data,
        });
        this.setState({
          guests: this.sortGuestsAtoZ(),
        });
      });
  };

  sortGuestsAtoZ() {
    return this.state.guests.sort(function (memberA, memberB) {
      var memberA = memberA.name.toUpperCase();
      var memberB = memberB.name.toUpperCase();
      return memberA < memberB ? -1 : memberA > memberB ? 1 : 0;
    });
  }

  sortDriversAtoZ = () => {
    return this.state.drivers.sort(function (memberA, memberB) {
      var memberA = memberA.name.toUpperCase();
      var memberB = memberB.name.toUpperCase();
      return memberA < memberB ? -1 : memberA > memberB ? 1 : 0;
    });
  };

  onFormChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      role: document.getElementById("new-member-role").value,
    });
  };

  render() {
    return (
      <div>
        <MemberForm
          member={this.state.member}
          mySubmitHandler={this.mySubmitHandler}
          onFormChange={this.onFormChange}
          updateState={this.updateState}
        />
        <DriverList
          drivers={this.state.drivers}
          fetchDrivers={this.fetchDrivers}
          sortDriversAtoZ={this.sortDriversAtoZ}
          componentDidMount={this.componentDidMount}
          deleteDriver={this.deleteDriver}
        />
        <GuestList
          guests={this.state.guests}
          sortGuestsAtoZ={this.sortGuestsAtoZ}
          fetchGuests={this.fetchGuests}
          componentDidMount={this.componentDidMount}
          deleteGuest={this.deleteGuest}
        />
      </div>
    );
  }
}
