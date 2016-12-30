var roleMinerMinerals = {
    /** @param {Creep} creep **/ 
    run: function(creep) { 
        var mineral = creep.room.find(FIND_MINERALS)[0]
        var targets = creep.room.find(FIND_STRUCTURES, { 
            filter: (structure) => { return (structure.structureType == STRUCTURE_CONTAINER) && (structure.pos.isNearTo(mineral)); 
                
            } 
            
        }); 
        if(targets.length > 0) { if(creep.pos.getRangeTo(targets[0]) == 0) 
        { 
        var source = creep.pos.findClosestByPath(FIND_MINERALS); creep.harvest(source); } 
        else { creep.moveTo(targets[0]);
        } 
            
        } 
        
    }
};
module.exports = roleMinerMinerals;