import {UserService} from '../services/UserService'
import {ProcessService} from '../services/ProcessService'
import {StepService} from '../services/StepService'
import {CreditorService} from '../services/CreditorService'
import {RecoveringService} from '../services/RecoveringService'
import {SegmentService} from '../services/SegmentService'
import {AssemblyService} from '../services/AssemblyService'
import {RoleService} from '../services/RoleService'
import {CreditorRepresentationService} from '../services/CreditorRepresentationService'
import {CreditorAssemblyService} from '../services/CreditorAssemblyService'

export interface DataSources{
  userService: UserService
  processService: ProcessService
  stepService: StepService
  creditorService: CreditorService
  recoveringService: RecoveringService
  segmentService: SegmentService
  assemblyService: AssemblyService
  roleService: RoleService
  creditorRepresentationService: CreditorRepresentationService
  creditorAssemblyService: CreditorAssemblyService
}