import React, { useState } from "react";
import './App.css'
import Data from './data.json'

function App() {

  const [data, setData] = useState(JSON.parse(Data));
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [newTeam, setNewTeam] = useState('');
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeeTeam, setNewEmployeeTeam] = useState('');
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [error, setError] = useState('');
  const [teamInput, setTeamInput] = useState("");
  const [employeeInput, setEmployeeInput] = useState("");
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const handleAddTeam = (e) => {
    e.preventDefault();
    setShowAddTeamModal(true);
  }

  const handleAddTeamModalClose = () => {
    setShowAddTeamModal(false);
  }

  const handleNewTeamChange = (e) => {
    setNewTeam(e.target.value);
  }

  const handleAddTeamSubmit = (e) => {
    e.preventDefault();
    if (!data.find((team) => team.team === newTeam)) {
      setData((prevState) => [...prevState, { team: newTeam, employees: [] }])
    }
    setNewTeam('');
    setShowAddTeamModal(false);
  }

  const handleAddEmployee = (e) => {
    e.preventDefault();
    setShowAddEmployeeModal(true);
  }

  const handleAddEmployeeModalClose = () => {
    setShowAddEmployeeModal(false);
  }

  const handleNewEmployeeNameChange = (e) => {
    setNewEmployeeName(e.target.value);
  }

  const handleNewEmployeeTeamChange = (e) => {
    setNewEmployeeTeam(e.target.value);
  }

  const handleAddEmployeeSubmit = (e) => {
    e.preventDefault();
    if (!newEmployeeName || !newEmployeeTeam) {
      // handle validation error
    } else {
      const team = data.find((team) => team.team === newEmployeeTeam);
      if (!team) {
        // handle error if team not found
      } else {
        team.employees.push(newEmployeeName);
        setNewEmployeeName('');
        setNewEmployeeTeam('');
        setShowAddEmployeeModal(false);
      }
    }
  }

  const handleTeamInput = (e) => {
    setTeamInput(e.target.value);
    setFilteredTeams(data.filter((team) => team.team.toLowerCase().includes(e.target.value.toLowerCase())));
  }
  const handleTeamClick = (team) => {
    setSelectedTeam(team);
    setTeamInput(team);
    setFilteredTeams([]);
  }

  const handleEmployeeInput = (e) => {
    setEmployeeInput(e.target.value);
    setFilteredEmployees(data.find((team) => team.team === selectedTeam)?.employees.filter((team) => team.toLowerCase().includes(e.target.value.toLowerCase())));
    console.log(data.find((team) => team.team === selectedTeam)?.employees.filter((team) => team.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setEmployeeInput(employee);
    setFilteredEmployees([]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTeam || !selectedEmployee) {
      setError("Please select both team and employee.");
    } else {
      setError("");
      // Submit form logic here
    }
  };

  return (
    <div className='app'>
      <form onSubmit={handleSubmit}>
        <section>
          <label>Team:</label>
          <input type="text" placeholder="Type to search" value={teamInput} onChange={handleTeamInput} onFocus={() => setFilteredTeams(data.filter(() => true))} />

          <div className='team-suggestions'>
            {filteredTeams.map((team) => <div key={team.team} onClick={() => handleTeamClick(team.team)}>{team.team}</div>)}
          </div>
        </section>
        <br />
        <label>Employee:</label>
        {selectedTeam ? (
          <section>
            <input type="text" placeholder="Type to search" value={employeeInput} onChange={handleEmployeeInput} />

            <div className='team-suggestions'>
              {filteredEmployees.map((employee) =>
                <div onClick={() => handleEmployeeClick(employee)} key={employee}>{employee}</div>)}
            </div>
          </section>
        ) : (
          <div style={{ color: "red" }}>{error}</div>
        )}
        <br />
        <div className="buttons">
          <button type="submit">Submit</button>
          <button onClick={handleAddTeam}>Add Team</button>
          <button onClick={handleAddEmployee}>Add Employee</button>
        </div>
      </form>
      {showAddTeamModal && (
        <div className='showAddTeamModal'>
          <form onSubmit={handleAddTeamSubmit}>
            <label>Team Name:</label>
            <input type="text" value={newTeam} onChange={handleNewTeamChange} />
            <br />
            <button type="submit">Add Team</button>
            <button onClick={handleAddTeamModalClose}>Cancel</button>
          </form>
        </div>
      )}
      {showAddEmployeeModal && (
        <div className='showAddTeamModal'>
          <form onSubmit={handleAddEmployeeSubmit}>
            <label>Employee Name:</label>
            <input type="text" value={newEmployeeName} onChange={handleNewEmployeeNameChange} />
            <br />
            <label>Employee Team:</label>
            <select onChange={handleNewEmployeeTeamChange} value={newEmployeeTeam}>
              <option value="">Select a team</option>
              {data.map((team) => <option key={team.team} value={team.team}>{team.team}</option>)}
            </select>
            <br />
            <button type="submit">Add Employee</button>
            <button onClick={handleAddEmployeeModalClose}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
