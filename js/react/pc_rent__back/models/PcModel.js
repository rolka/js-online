const executeStatement = require('../queries');
module.exports = class PcModel
{
    #id;
    owner_id;
    pcName;
    cpu;
    gpu;
    ramType;
    ramSpeed;
    ramAmount;
    pcType;
    constructor ({ owner_id, pcName, cpu, gpu, pcType, ramSpeed, ramType, ramAmount }, id = null)
    {
        this.#id = id;
        this.owner_id = owner_id;
        this.pcName = pcName;
        this.cpu = cpu;
        this.gpu = gpu;
        this.pcType = pcType;
        this.ramAmount = ramAmount;
        this.ramSpeed = ramSpeed;
        this.ramType = ramType;
    }
    get id()
    {
        return this.#id
    }

    static async findAll()
    {
        const [results] =
            await executeStatement(`select * from pc`);
        // console.log(results);
        return results.map((pc) => {
            return new PcModel({
                owner_id: pc.owner_id,
                pcName: pc.pc_name,
                cpu: pc.cpu,
                gpu: pc.gpu,
                pcType: pc.pc_type,
                ramSpeed: pc.ram_speed,
                ramType: pc.ram_type,
                ramAmount: pc.ram_amount
            }, pc.id )
        })
    }
    static async findByOwner(ownerId)
    {
        // console.log(ownerId);
        const [results] =
            await executeStatement(`select * from pc where owner_id = ?`, [ownerId]);
        // console.log(results);
        return results.map((pc) => {
            return new PcModel({
                owner_id: pc.owner_id,
                pcName: pc.pc_name,
                cpu: pc.cpu,
                gpu: pc.gpu,
                pcType: pc.pc_type,
                ramSpeed: pc.ram_speed,
                ramType: pc.ram_type,
                ramAmount: pc.ram_amount
            }, pc.id )
        })
    }
    static async findById(pcId)
    {
        const [results] =
        await executeStatement('select * from pc where id = ?', [pcId] );
        // console.log(results);
        // return results;
        if ( ! results.length )
        {
            return null;
        }
        const pc = results[0];
        return new PcModel({
            owner_id: pc.owner_id,
            pcName: pc.pc_name,
            cpu: pc.cpu,
            gpu: pc.gpu,
            pcType: pc.pc_type,
            ramSpeed: pc.ram_speed,
            ramType: pc.ram_type,
            ramAmount: pc.ram_amount
        }, pc.id );
    }

    async createPc()
    {
        // return this.owner_id;
        const result =
            await executeStatement(
            `insert into pc ( owner_id, pc_name, cpu, gpu, ram_type, ram_speed, ram_amount, pc_type ) values ( ?, ?, ?, ?, ?, ?, ?, ? )`,
                [
                    this.owner_id,
                    this.pcName,
                    this.cpu,
                    this.gpu,
                    this.ramType,
                    this.ramSpeed,
                    this.ramAmount,
                    this.pcType
                ]
        );
        this.#id = result[0].insertId;
        return result;
    }

    getInstance()
    {
        return {
            id: this.#id,
            ...this
        }
    }
}