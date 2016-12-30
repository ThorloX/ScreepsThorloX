var roleMover1 = {

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
        ((s.structureType == STRUCTURE_SPAWN || 
          s.structureType == STRUCTURE_EXTENSION || 
          s.structureType == STRUCTURE_LINK || 
          s.structureType == STRUCTURE_TOWER) 
          && s.energy < s.energyCapacity) ||
        ((s.structureType == STRUCTURE_STORAGE) && _.sum(s.store) < s.storeCapacity)
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
                var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] > 0);
                    }
                });


                var source = creep.pos.findClosestByPath(containers);
                if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                } else var source = creep.pos.findClosestByPath(FIND_SOURCES);
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }


        }

    }

};

module.exports = roleMover1;