import {Repository, getConnection} from 'typeorm'

export class BaseService<T>{
  private repository: Repository<T>
  private name: string

  constructor(repository: string, name?:string){
    this.repository = getConnection().getRepository<T>(repository)
    this.name = name || ''
  }
  
  // async get(query: object = {}): Promise<T[]>{
  //   return []
  // }

  async getAll(query: object = {}): Promise<T[]>{
    return await this.repository.find(query)
  }

  async getById(id: number | string): Promise<T | undefined>{
    return await this.repository.findOne(id)
  }

  async getOne(query: object = {}): Promise<T | undefined>{
    return await this.repository.findOne(query)
  }

  // async create(t: T){

  // }

  async update(id: string | number, t: Partial<T>): Promise<T>{
    const data = await this.getById(id)

    if(!data){
      throw Error(`${this.name || 'Objeto'} não encontrado!`)
    }

    const merged = this.repository.merge(data, t as T)
    return await this.repository.save(merged)

  }

  // async delete (id: string){
    
  // }

  async count(query: object = {}): Promise<number>{
    return this.repository.count(query)
  }

  async exists(query: object = {}): Promise<boolean>{
    return !!this.repository.count(query)
  }
}