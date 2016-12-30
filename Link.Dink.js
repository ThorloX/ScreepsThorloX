var LinkDink = {
    run: function(room) {

        // Your Room, (basically your links, LinkTo = Direction of all the resources)
        if (room.name == 'E17N67') {
            if (!Game.spawns.Spawn1) return;

            var linkFrom1 = Game.spawns.Spawn1.room.lookForAt('structure', 46, 37)[0];
            var linkTo = Game.spawns.Spawn1.room.lookForAt('structure', 12, 30)[0];
            var linkFrom2 = Game.spawns.Spawn1.room.lookForAt('structure', 17, 45)[0];

            //at source 1
            if (linkFrom1 != undefined && linkTo != undefined) {
                if (linkFrom1 && linkFrom1.cooldown == 0 && linkTo.energyCapacity >= linkFrom1.energy && linkFrom1.energy >= 200)
                    linkFrom1.transferEnergy(linkTo, linkTo.energyCapacity - linkTo.energy);
            }

            //at source 2
            if (linkFrom2 != undefined && linkTo != undefined) {
                if (linkFrom2 && linkFrom2.cooldown == 0 && linkTo.energyCapacity - linkTo.energy >= linkFrom2.energy && linkFrom2.energy >= 200)
                    linkFrom2.transferEnergy(linkTo);
            }
        }

    }
};

module.exports = LinkDink;