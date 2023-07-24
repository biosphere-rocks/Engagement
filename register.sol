// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import del contrato ERC-721 de OpenZeppelin
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DAO is ERC721, Ownable {
    struct Project {
        string name;
        string commitment;
        uint256 date;
    }

    Project[] public projects;
    mapping(uint256 => bool) public projectExists;

    constructor() ERC721("DAO NFT", "DNFT") {}

    function registerProject(string memory _name, string memory _commitment, uint256 _date) external onlyOwner {
        uint256 projectId = projects.length;
        Project memory newProject = Project(_name, _commitment, _date);
        projects.push(newProject);
        projectExists[projectId] = true;

        // Generar el NFT para el proyecto registrado
        _mint(msg.sender, projectId);
    }

    function getProject(uint256 _projectId) external view returns (string memory, string memory, uint256) {
        require(projectExists[_projectId], "El proyecto no existe");
        Project memory project = projects[_projectId];
        return (project.name, project.commitment, project.date);
    }
}
