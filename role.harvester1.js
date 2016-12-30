var roleHarvester1 = {

    /** @param {Creep} creep **/
    run: function(creep) {



        if (creep.carry.energy >= creep.carryCapacity) {
            creep.memory.load = true;
        }
        if (creep.carry.energy == 0) {
            creep.memory.load = false;
        }


        if (creep.memory.load)
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (s) => {
        return (
        ((s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION || s. structureType == STRUCTURE_LINK) && s.energy < s.energyCapacity) ||
        ((s.structureType == STRUCTURE_STORAGE || s.structureType == STRUCTURE_TERMINAL) && _.sum(s.store) < s.storeCapacity)
        )
        }
        })
        if (target != null && creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        } else {
            if (creep.carry.energy < creep.carryCapacity) {

                var source = creep.room.find(FIND_DROPPED_RESOURCES)
                if (creep.pickup(source[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source[0]);
                }
                var sources = creep.room.find(FIND_SOURCES);
                if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            }
        }

    }

};


module.exports = roleHarvester1;
var roleLogistic = require('role.logistic');



// same same, just specific source, and other focus.