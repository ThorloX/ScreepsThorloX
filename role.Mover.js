var roleMover = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.energy >= creep.carryCapacity) {
            creep.memory.load = true;
        }
        if (creep.carry.energy == 0) {
            creep.memory.load = false;
        }
        



        if (creep.memory.load)
// ADD FLAG NAME OF YOUR CHOOSING AND Switch "Mover" with your flag name, example "Anal"
            var target = Game.flags["Mover"].pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => {
    return (
        ((s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION || STRUCTURE_LINK) && s.energy < s.energyCapacity) ||
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
                    filter: (st) => {
                        return (st.structureType == STRUCTURE_CONTAINER || st.structureType == STRUCTURE_TERMINAL) && (st.store[RESOURCE_ENERGY] > 0);
                    }
                });
                var container = creep.pos.findClosestByPath(containers);

                var source = creep.pos.findClosestByPath(containers);
                if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                } 
            }


        }

    }

};

module.exports = roleMover;


// moving energy from containers by FLAGS. 