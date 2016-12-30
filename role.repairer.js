var roleBuilder = require('role.builder1');

var roleRepairer = {
    run: function(creep) {

        if (creep.memory.working == false) {
            //creep.say('harvesting');
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] > 0);
                }
            });
            var source = creep.room.find(FIND_DROPPED_RESOURCES)
            if (creep.pickup(source[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source[0]);
            } else var source = creep.pos.findClosestByPath(containers);
            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            } else var source = creep.pos.findClosestByPath(FIND_SOURCES, {
                filter: s => s.energy > 0
            });
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
            if (creep.carry.energy == creep.carryCapacity || !source) {
                creep.memory.working = true;
            }
        } else {
            var structure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: s => (s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART) ||
                    (s.structureType == STRUCTURE_RAMPART && s.hits < 0.03 * s.hitsMax)
            });

            if (structure) {
                //creep.say('repairing');
                if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            } else {
                //creep.say('no targets to build');
                roleBuilder1.run(creep);
            }

            if (creep.carry.energy == 0) {
                creep.memory.working = false;
            }
        }
    }
};

module.exports = roleRepairer;