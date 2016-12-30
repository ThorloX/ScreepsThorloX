var roleUpgrader2 = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (!creep.memory.task) {
            creep.memory.task = 'get';
        }
        if (creep.memory.task == 'get') {

            var source = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_LINK;
                }
            });
            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(source);



            else var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] > 0);
                }
            });

            var source = creep.pos.findClosestByPath(containers);
            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            } else {
                var source = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] >= creep.carryCapacity;
                    }
                });
                if (source) {
                    if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(source);
                }
            }


            if (creep.carry.energy == creep.carryCapacity) {
                creep.memory.task = 'give';
            }
        } else {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
            if (creep.carry.energy == 0) {
                creep.memory.task = 'get';
            }
        }
    }
};

module.exports = roleUpgrader2;