var LinkDink = require('Link.Dink');
var ToTheTerminal = require('ToTheTerminal');
var roleHarvester = require('role.harvester');
var roleHarvester1 = require('role.harvester1');
var roleUpgrader = require('role.upgrader');
var roleUpgrader1 = require('role.upgrader1');
var roleUpgrader2 = require('role.upgrader2');
var roleBuilder = require('role.builder');
var roleBuilder1 = require('role.builder1');
var roleRepairer = require('role.repairer');
//var roleRefiller = require('role.refiller');
var roleCarrier = require('role.carrier');
var roleLogistic = require('role.logistic');
var roleMiner = require('role.miner');
var roleMover = require('role.mover');
var roleMover1 = require('role.mover1');
//var roleMover2 = require('role.mover2');
var roleMiner1 = require('role.miner1');
var roleExtractor = require('role.extractor');
var roleMinerMinerals = require('role.MinerMinerals');




module.exports.loop = function() {

    //** Clearing None-exsisting/Dead creep memory **//

    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }


//                               Tower 1
    var tower = Game.getObjectById('58362c20f0ef63475a4e11b5');
    if (tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

        var closestDamagedCreep = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: o => o.hits < o.hitsMax
        });

        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: o => (o.structureType == STRUCTURE_CONTAINER || o.structureType == STRUCTURE_ROAD) &&
                o.hits < o.hitsMax
        });

        var walls = tower.room.find(FIND_STRUCTURES, {
            filter: o => o.structureType == STRUCTURE_WALL && o.hits < 2000000

        });
        var Rampart = tower.room.find(FIND_STRUCTURES, {
            filter: o => o.structureType == STRUCTURE_RAMPART && o.hits < 2000000

        });
        var mostDamagedWall = null;
        if (walls.length) mostDamagedWall = _.min(walls, o => o.hits);

        var mostDamagedRampart = null;
        if (Rampart.length) mostDamagedRampart = _.min(Rampart, o => o.hits);

        if (mostDamagedWall && mostDamagedRampart && !closestDamagedCreep && !closestDamagedStructure && !closestHostile && tower.energy > tower.energyCapacity * 0.5) {
            var emptyExtensions = tower.room.find(FIND_STRUCTURES, {
                filter: o => o.structureType == STRUCTURE_EXTENSION && o.energy == 0
            });
            if (!emptyExtensions.length) tower.repair(mostDamagedWall);
        }

        if (closestDamagedCreep && !closestHostile && tower.energy > tower.energyCapacity * 0.2) {
            tower.heal(closestDamagedCreep);
        }

        if (closestDamagedStructure && !closestDamagedCreep && !closestHostile && tower.energy > tower.energyCapacity * 0.2) {
            tower.repair(closestDamagedStructure);
        }

        if (closestHostile) {
            tower.attack(closestHostile);
        }
    }

//                               TOWER 2 

    var tower = Game.getObjectById('58419cdaffbb80742f17f294');
    if (tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

        var closestDamagedCreep = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: o => o.hits < o.hitsMax
        });

        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: o => (o.structureType == STRUCTURE_CONTAINER || o.structureType == STRUCTURE_ROAD) &&
                o.hits < o.hitsMax
        });

        var walls = tower.room.find(FIND_STRUCTURES, {
            filter: o => o.structureType == STRUCTURE_WALL && o.hits < 2000000

        });
        var Rampart = tower.room.find(FIND_STRUCTURES, {
            filter: o => o.structureType == STRUCTURE_RAMPART && o.hits < 2000000

        });
        var mostDamagedWall = null;
        if (walls.length) mostDamagedWall = _.min(walls, o => o.hits);

        var mostDamagedRampart = null;
        if (Rampart.length) mostDamagedRampart = _.min(Rampart, o => o.hits);

        if (mostDamagedWall && mostDamagedRampart && !closestDamagedCreep && !closestDamagedStructure && !closestHostile && tower.energy > tower.energyCapacity * 0.5) {
            var emptyExtensions = tower.room.find(FIND_STRUCTURES, {
                filter: o => o.structureType == STRUCTURE_EXTENSION && o.energy == 0
            });
            if (!emptyExtensions.length) tower.repair(mostDamagedWall);
        }

        if (closestDamagedCreep && !closestHostile && tower.energy > tower.energyCapacity * 0.2) {
            tower.heal(closestDamagedCreep);
        }

        if (closestDamagedStructure && !closestDamagedCreep && !closestHostile && tower.energy > tower.energyCapacity * 0.2) {
            tower.repair(closestDamagedStructure);
        }

        if (closestHostile) {
            tower.attack(closestHostile);
        }
    }

    

    //** Filter roles **//


    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    ('Harvesters: ' + harvesters.length);
    var harvesters1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester1');
    ('Harvesters: ' + harvesters.length);
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    ('Harvesters: ' + harvesters.length);
    var upgraders1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader1');
    ('Harvesters: ' + harvesters.length);
    var upgraders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader2');
    ('Harvesters: ' + harvesters.length);
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    ('Harvesters: ' + harvesters.length);
    var builder1s = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder1');
    ('Harvesters: ' + harvesters.length);
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    ('Harvesters: ' + harvesters.length);
/*    var refillers = _.filter(Game.creeps, (creep) => creep.memory.role == 'refiller');
    ('Harvesters: ' + harvesters.length);*/
    var carriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier');
    ('Harvesters: ' + harvesters.length);
    var logistics = _.filter(Game.creeps, (creep) => creep.memory.role == 'logistic');
    ('Harvesters: ' + harvesters.length);
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    ('Harvesters: ' + harvesters.length);
    var miner1s = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner1');
    ('Harvesters: ' + harvesters.length);
    var movers = _.filter(Game.creeps, (creep) => creep.memory.role == 'mover');
    ('Harvesters: ' + harvesters.length);
    var mover1s = _.filter(Game.creeps, (creep) => creep.memory.role == 'mover1');
    ('Harvesters: ' + harvesters.length);
    var Extractors = _.filter(Game.creeps, (creep) => creep.memory.role == 'Extractor');
    ('Harvesters: ' + harvesters.length);
    var minerMinerals = _.filter(Game.creeps, (creep) => creep.memory.role == 'minerMinerals');
    ('Harvesters: ' + harvesters.length);
/*    var mover2s = _.filter(Game.creeps, (creep) => creep.memory.role == 'mover2');
    ('Harvesters: ' + harvesters.length);*/

    //** Creep Role's Adjust length < Nr for amount **//
    if (harvesters1.length < 0) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'Harvester1', {
            role: 'harvester1'
        });
        ('Spawning new harvester1: ' + newName);
        console.log
    }
    if (harvesters.length < 0) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, MOVE], 'Harvester', {
            role: 'harvester'
        });
        ('Spawning new harvester: ' + newName);
        console.log
    }
    if (carriers.length < 0) {
        var newName = Game.spawns['Spawn1'].createCreep([CARRY, CARRY, CARRY, MOVE, MOVE, CARRY, CARRY], 'Carrier', {
            role: 'carrier'
        });
        ('Spawning new carrier: ' + newName);
        console.log
    }
/*    if (refillers.length < 0) {
        var newName = Game.spawns['Spawn1'].createCreep([CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'Refiller', {
            role: 'refiller'
        });
        ('Spawning new refiller: ' + newName);
        console.log
    }*/

    if (upgraders.length < 0) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'Upgrader', {
            role: 'upgrader'
        });
        ('Spawning new upgrader: ' + newName);
        console.log
    }
    if (upgraders1.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, CARRY, MOVE], 'Upgrader1', {
            role: 'upgrader1'
        });
        ('Spawning new upgrader1: ' + newName);
        console.log
    }
    if (upgraders2.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, MOVE, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'Upgrader2', {
            role: 'upgrader2'
        });
        ('Spawning new upgrader2: ' + newName);
        console.log
    }
    if (builders.length < 0) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'Builder', {
            role: 'builder'
        });
        ('Spawning new builder: ' + newName);
        console.log
    }
    if (builder1s.length < 0) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, CARRY, MOVE, MOVE, MOVE, MOVE], 'Builder1', {
            role: 'builder1'
        });
        ('Spawning new builder1: ' + newName);
        console.log
    }
    if (repairers.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'Repairer', {
            role: 'repairer'
        });
        ('Spawning new repairer: ' + newName);
        console.log
    }
    if (logistics.length < 0) {
        var newName = Game.spawns['Spawn1'].createCreep([CARRY, CARRY, MOVE], 'Logistic', {
            role: 'logistic'
        });
        ('Spawning new logistic: ' + newName);
        console.log
    }
    if (miners.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE], 'Miner', {
            role: 'miner'
        });
        ('Spawning new miner: ' + newName);
        console.log
    }
    if (miner1s.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE], 'Miner1', {
            role: 'miner1'
        });
        ('Spawning new miner1: ' + newName);
        console.log
    }
    if (minerMinerals.length < 0) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE], 'MinerMinerals', {
            role: 'MinerMinerals'
        });
        ('Spawning new miner: ' + newName);
        console.log
    }
    if (movers.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([MOVE, MOVE, CARRY, CARRY, CARRY, CARRY], 'Mover', {
            role: 'mover'
        });
        ('Spawning new mover: ' + newName);
        console.log
    }
    if (mover1s.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([CARRY, CARRY, CARRY, CARRY, MOVE, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'Mover1', {
            role: 'mover1'
        });
        ('Spawning new mover1: ' + newName);
        console.log
    }
/*    if (mover2s.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([CARRY, CARRY, CARRY, MOVE, MOVE], 'Mover2', {
            role: 'mover2'
        });
        ('Spawning new mover2: ' + newName);
        console.log
    }*/
    if (Extractors.length < 0) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], 'Extractor', {
            role: 'Extractor'
        });
        ('Spawning new Extractor: ' + newName);
        console.log
    }




    //** Assign Workloop **//

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
/*        if (creep.memory.role == 'refiller') {
            roleRefiller.run(creep);
        } */
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'upgrader1') {
            roleUpgrader1.run(creep);
        }
        if (creep.memory.role == 'upgrader2') {
            roleUpgrader2.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'builder1') {
            roleBuilder1.run(creep);
        }
        if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if (creep.memory.role == 'carrier') {
            roleCarrier.run(creep);
        }
        if (creep.memory.role == 'logishtic') {
            roleLogistic.run(creep);
        }
        
        if (creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if (creep.memory.role == 'miner1') {
            roleMiner1.run(creep);
        }
        if (creep.memory.role == 'MinerMinerals') {
            roleMinerMinerals.run(creep);
        }
        if (creep.memory.role == 'mover') {
           roleMover.run(creep);
        }
        if (creep.memory.role == 'mover1') {
            roleMover1.run(creep);
        }
/*        if (creep.memory.role == 'mover2') {
            roleMover2.run(creep);
        }*/
        if (creep.memory.role == 'Extractor') {
            roleExtractor.run(creep);
        }
        if (creep.memory.role == 'harvester1') {
            roleHarvester1.run(creep);
        }
    }
    var myRooms = Game.rooms
    for (var name in myRooms) {
        var room = myRooms[name];

        //Allerts
        if ((room.name == 'E17N67' || room.name == 'E17N67') && room.find(FIND_MY_CREEPS).length < 2) Game.notify('O balls; screep count in room ' + room.name + ' = ' + room.find(FIND_MY_CREEPS).length);

//          RUN = ON
        
//          LINK CODE 

        LinkDink.run(room);
        
//        TERMINAL CODE  

        ToTheTerminal.run(room);

//          TOWER CODE
//              FAIL ~~~custome inside main code look top for code~~~~
    }

}



/* code


*/