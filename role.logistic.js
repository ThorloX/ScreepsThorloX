var roleLogistic = { /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.supplying && creep.carry.energy == 0) {
            creep.memory.supplying = false;
            creep.say('fetching');
        }

        if (!creep.memory.supplying && creep.carry.energy == creep.carryCapacity) {
            creep.memory.supplying = true;
            creep.say('supplying');

        }
        if (creep.memory.supplying) {
            var stores = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE) && (structure.store[RESOURCE_ENERGY] < structure.storeCapacity);
                }
            });

            if (stores && stores.length > 0) {
                if (creep.transfer(stores[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(stores[0]);
                }
            }
        } else {
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_LINK) && (structure.store[RESOURCE_ENERGY] > 0);
                }
            });

            var source = creep.pos.findClosestByPath(containers);
            if (source) {
                if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }

            }

        }
    }
};

module.exports = roleLogistic;


// moving 