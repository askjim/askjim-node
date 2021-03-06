/***
*       _____          __         __.__
*      /  _  \   _____|  | __    |__|__| _____
*     /  /_\  \ /  ___/  |/ /    |  |  |/     \
*    /    |    \\___ \|    <     |  |  |  Y Y  \
*    \____|__  /____  >__|_ \/\__|  |__|__|_|  /
*            \/     \/     \/\______|        \/
*
*
*  askjim
*
*
*  insipired by pureMVC Framework and PureMVC JS Native Port by David Foley, Frédéric Saunier, & Alain Duchesneau
*  Bon après c'est pas la même chose!
*
*  Reuse governed by Creative Commons Attribution 3.0
*  http://creativecommons.org/licenses/by/3.0/us/
*
*  more infos https://github.com/awallef/askjim-node
*
*/

/***
 *                               .__
 *    _______   ____  ________ __|__|______   ____
 *    \_  __ \_/ __ \/ ____/  |  \  \_  __ \_/ __ \
 *     |  | \/\  ___< <_|  |  |  /  ||  | \/\  ___/
 *     |__|    \___  >__   |____/|__||__|    \___  >
 *                 \/   |__|                     \/
 */
const { fork } = require('child_process');

/***
*    .___                 __                        __  .__
*    |   | ____   _______/  |________ __ __   _____/  |_|__| ____   ____
*    |   |/    \ /  ___/\   __\_  __ \  |  \_/ ___\   __\  |/  _ \ /    \
*    |   |   |  \\___ \  |  |  |  | \/  |  /\  \___|  | |  (  <_> )   |  \
*    |___|___|  /____  > |__|  |__|  |____/  \___  >__| |__|\____/|___|  /
*             \/     \/                          \/                    \/
*/
function Instruction(name, body, type, header)
{
  this.name = name;
  this.body = body;
  this.type = type;
  this.header = header;
}

Instruction.prototype.getHeader = function() {
  return this.header;
};

Instruction.prototype.setHeader = function(header) {
  this.header = header;
};

Instruction.prototype.getName = function() {
  return this.name;
};

Instruction.prototype.getBody = function() {
  return this.body;
};

Instruction.prototype.setBody = function(body) {
  this.body = body;
};

Instruction.prototype.getType = function() {
  return this.type;
};

Instruction.setType = function(type) {
  this.type = type;
};

Instruction.prototype.name = null;
Instruction.prototype.body = null;
Instruction.prototype.type = null;
Instruction.prototype.header = null;

/***
*    .___                 __                        __  .__                ___ ___                     .___
*    |   | ____   _______/  |________ __ __   _____/  |_|__| ____   ____  /   |   \   ____ _____     __| _/___________
*    |   |/    \ /  ___/\   __\_  __ \  |  \_/ ___\   __\  |/  _ \ /    \/    ~    \_/ __ \\__  \   / __ |/ __ \_  __ \
*    |   |   |  \\___ \  |  |  |  | \/  |  /\  \___|  | |  (  <_> )   |  \    Y    /\  ___/ / __ \_/ /_/ \  ___/|  | \/
*    |___|___|  /____  > |__|  |__|  |____/  \___  >__| |__|\____/|___|  /\___|_  /  \___  >____  /\____ |\___  >__|
*             \/     \/                          \/                    \/       \/       \/     \/      \/    \/
*/
function InstructionHeader(processName, pid, step, time)
{
  this.processName = processName;
  this.pid = pid;
  this.step = step;
  this.time = time;
}

InstructionHeader.prototype.kill = function()
{
  this.processName = null;
  this.pid = null;
  this.time = null;
  this.step = null;
};

InstructionHeader.prototype.processName = null;
InstructionHeader.prototype.pid = null;
InstructionHeader.prototype.time = null;
InstructionHeader.prototype.step = null;

/***
*    __________
*    \______   \_______  ____   ____  ____   ______ ______
*     |     ___/\_  __ \/  _ \_/ ___\/ __ \ /  ___//  ___/
*     |    |     |  | \(  <_> )  \__\  ___/ \___ \ \___ \
*     |____|     |__|   \____/ \___  >___  >____  >____  >
*                                  \/    \/     \/     \/
*/
function Process(pid, tasksArray)
{
  this.pid = pid;
  this.step = 0;
  this.tasksArray = tasksArray;
  this.state = this.constructor.WAIT;
}

Process.prototype.getCurrentTask = function()
{
  return this.tasksArray[ this.step ];
};

Process.prototype.isOver = function()
{
  return (this.step == this.tasksArray.length - 1) ? true : false;
};

Process.prototype.pid = null;
Process.prototype.step = null;
Process.prototype.tasksArray = null;

Process.WAIT = 'Process.WAIT';
Process.RUNNING = 'Process.RUNNING';
Process.CRASHED = 'Process.CRASHED';

/***
*    ________  .__                      __         .__
*    \______ \ |__| _________________ _/  |_  ____ |  |__   ___________
*     |    |  \|  |/  ___/\____ \__  \\   __\/ ___\|  |  \_/ __ \_  __ \
*     |    `   \  |\___ \ |  |_> > __ \|  | \  \___|   Y  \  ___/|  | \/
*    /_______  /__/____  >|   __(____  /__|  \___  >___|  /\___  >__|
*            \/        \/ |__|       \/          \/     \/     \/
*/
function Dispatcher()
{
}

Dispatcher.prototype.dispatch = function(instructionName, body, type)
{
  if (this.jim)
  {
    this.jim.dispatch(instructionName, body, type);
  }
};

Dispatcher.prototype.ask = function(label, body, type)
{
  if (this.jim)
  {
    this.jim.ask(label, body, type);
  }
};

Dispatcher.prototype.jim = null;

/***
*    ________ ___.
*    \_____  \\_ |__   ______ ______________  __ ___________
*     /   |   \| __ \ /  ___// __ \_  __ \  \/ // __ \_  __ \
*    /    |    \ \_\ \\___ \\  ___/|  | \/\   /\  ___/|  | \/
*    \_______  /___  /____  >\___  >__|    \_/  \___  >__|
*            \/    \/     \/     \/                 \/
*/
function Observer(dispatchMethod, dispatchContext) {
  this.setDispatchMethod(dispatchMethod);
  this.setDispatchContext(dispatchContext);
}

Observer.prototype = new Dispatcher;
Observer.prototype.constructor = Observer;

Observer.prototype.setDispatchMethod = function(dispatchMethod)
{
  this.dispatch = dispatchMethod;
};

Observer.prototype.setDispatchContext = function(dispatchContext)
{
  this.context = dispatchContext;
};

Observer.prototype.getDispatchMethod = function()
{
  return this.dispatch;
};

Observer.prototype.getDispatchContext = function()
{
  return this.context;
};

Observer.prototype.dispatchObserver = function(instruction)
{
  this.getDispatchMethod().call(this.getDispatchContext(), instruction);
};

Observer.prototype.compareDispatchContext = function(object)
{
  return object === this.context;
};

Observer.prototype.dispatch = null;
Observer.prototype.context = null;
/***
*    ___________              __
*    \__    ___/____    _____|  | __
*      |    |  \__  \  /  ___/  |/ /
*      |    |   / __ \_\___ \|    <
*      |____|  (____  /____  >__|_ \
*                   \/     \/     \/
*/
function Task(instruction)
{
  this.instruction = instruction;
}

Task.prototype = new Dispatcher;
Task.prototype.constructor = Task;

Task.prototype.execute = function(instruction)
{

};

Task.prototype.nextTask = function()
{
  if (this.instruction)
  {
    if (this.instruction.header)
    {
      if (this.instruction.header.processName)
      this.jim.nextTask(this.instruction);
    }
  }

  this.kill();
};

Task.prototype.kill = function()
{
  this.jim = null;
  this.instruction = null;
  this.execute = null;
};

Task.prototype.instruction = null;

/***
*      _________                  .__
*     /   _____/ ______________  _|__| ____  ____
*     \_____  \_/ __ \_  __ \  \/ /  |/ ___\/ __ \
*     /        \  ___/|  | \/\   /|  \  \__\  ___/
*    /_______  /\___  >__|    \_/ |__|\___  >___  >
*            \/     \/                    \/    \/
*/
function Service(serviceName) {
  this.serviceName = serviceName || this.constructor.NAME;
}

Service.prototype = new Dispatcher;
Service.prototype.constructor = Service;

Service.prototype.getServiceName = function()
{
  return this.serviceName;
};

Service.prototype.listInstructionInterests = function()
{
  return [];
};

Service.prototype.handleInstruction = function(instruction)
{
  return;
};

Service.prototype.onRegister = function()
{
  return;
};

Service.prototype.onRemove = function()
{
  return;
};

Service.prototype.serviceName = null;

Service.NAME = "Service";

/***
*    __________                  .___.__
*    \______   \__ __  ____    __| _/|  |   ____
*     |    |  _/  |  \/    \  / __ | |  | _/ __ \
*     |    |   \  |  /   |  \/ /_/ | |  |_\  ___/
*     |______  /____/|___|  /\____ | |____/\___  >
*            \/           \/      \/           \/
*/
function Bundle(jim, name, configObject)
{
  this.jim = jim;
  this.name = name;
  this.initializeBundle(configObject);
}

Bundle.prototype = new Dispatcher;
Bundle.prototype.constructor = Bundle;

Bundle.prototype.initializeBundle = function(configObject)
{
};

Bundle.prototype.removeBundle = function(  )
{
};

Bundle.prototype.name = null;
Bundle.prototype.jim = null;

/***
*    __________
*    \______   \_______  ____   ____  ____   ______ _________________
*     |     ___/\_  __ \/  _ \_/ ___\/ __ \ /  ___//  ___/  _ \_  __ \
*     |    |     |  | \(  <_> )  \__\  ___/ \___ \ \___ (  <_> )  | \/
*     |____|     |__|   \____/ \___  >___  >____  >____  >____/|__|
*                                  \/    \/     \/     \/
*/
function Processor( )
{
  this.processMap = {};
  this.activeProcesses = {};
}

Processor.prototype.hasProcess = function(processName)
{
  return (this.processMap[processName]) ? true : false;
};

Processor.prototype.registerProcess = function(processName, tasksArray)
{
  this.processMap[processName] = new Process(Processor.getNewProcessId(), tasksArray);
};

Processor.prototype.removeProcess = function(processName)
{
  delete this.processMap[processName];
};

Processor.prototype.extractTasksFromProcess = function(processName)
{
  var tasks = [];
  for (var i in this.processMap[processName].tasksArray)
  {
    var task = this.processMap[processName].tasksArray[ i ];
    if (this.processMap.hasOwnProperty(task))
    {
      tasks = Array.prototype.concat(tasks, this.extractTasksFromProcess(task));
    } else {
      tasks.push(task);
    }
  }

  return tasks;
};

Processor.prototype.execute = function(processName, body, type)
{
  if (this.processMap.hasOwnProperty(processName))
  {
    this.processMap[processName].tasksArray = this.extractTasksFromProcess(processName);
    this.processMap[processName].step = 0;
    this.jim.log('Processor -> start ' + processName);
    this.activeProcesses[ this.processMap[processName].pid ] = this.processMap[processName];
    this._exec(processName, body, type);
  } else {
    this.jim.log("! Processor -> process " + processName + " dosen't exist");
  }
};

Processor.prototype.nextTask = function(instruction)
{
  var processName = instruction.header.processName;
  if (this.processMap.hasOwnProperty(processName))
  {
    if (!this.processMap[processName].isOver())
    {
      this.processMap[processName].step++;
      var body = instruction.getBody();
      var type = instruction.getType();
      instruction.header.kill();
      instruction.header = null;
      instruction.body = null;
      instruction.type = null;
      instruction = null;
      this._exec(processName, body, type);
      processName = null;
      body = null;
      type = null;
    } else {
      this.processMap[processName].state = Process.WAIT;
      delete this.activeProcesses[ this.processMap[processName].pid ];
      this.jim.log("Processor -> process " + processName + " is Finished");
    }

  } else {
    this.jim.log("! Processor -> process " + processName + " dosen't exist");
  }
};

Processor.prototype._exec = function(processName, body, type)
{
  var process = this.processMap[processName];
  process.state = Process.RUNNING;
  var task = process.getCurrentTask();
  var header = new InstructionHeader(processName, process.pid, process.step, new Date());
  this.jim.log('Processor -> _exec task: ' + task);
  this.jim.dispatch(task, body, type, header);

  process = null;
  //task = null;
  //type = null;
  //header.kill();
  //header = null;
};

Processor.prototype.processMap = null;
Processor.prototype.jim = null;
Processor.prototype.activeProcesses = null;

Processor.getNewProcessId = function()
{
  if (Processor.lastProcessId == Number.MAX_VALUE)
  Processor.lastProcessId = 0;
  return Processor.lastProcessId++;
};

Processor.lastProcessId = 0;

/***
*      _________
*     /   _____/ ____  ________ __   ____   ____   ____  ___________
*     \_____  \_/ __ \/ ____/  |  \_/ __ \ /    \_/ ___\/ __ \_  __ \
*     /        \  ___< <_|  |  |  /\  ___/|   |  \  \__\  ___/|  | \/
*    /_______  /\___  >__   |____/  \___  >___|  /\___  >___  >__|
*            \/     \/   |__|           \/     \/     \/    \/
*/
function Sequencer() {
  this.cronMap = {};
}

Sequencer.prototype.cronExec = function(note)
{
  this.jim.controller.ask(note.name, note.body, note.type);
};

/* CRON JOB
**********************************************/
Sequencer.prototype.registerCronJob = function(labelOrName, delay, note, stopCount)
{

  if (!this.cronMap[labelOrName])
  {
    this.cronMap[labelOrName] = new CronJob(this, labelOrName, delay, note, stopCount);
  } else {

    var cron = this.cronMap[labelOrName];
    cron.stop();
    cron.labelOrName = labelOrName;
    cron.delay = delay;
    cron.note = note;
    cron.stopCount = stopCount;
  }

};

Sequencer.prototype.startCronJob = function(labelOrName)
{
  if (this.cronMap[labelOrName])
  (this.cronMap[labelOrName]).start();
};

Sequencer.prototype.stopCronJob = function(labelOrName, andDestroy)
{
  if (this.cronMap[labelOrName])
  {
    this.cronMap[labelOrName].stop();
    if (andDestroy)
    {
      this.cronMap[labelOrName].destroy();
      delete this.cronMap[labelOrName];
    }

  }
};

Sequencer.prototype.stopAllCronJob = function(andDestroy)
{
  for (var i in this.cronMap)
  {
    this.cronMap[i].stop();
    if (andDestroy)
    {
      this.cronMap[i].destroy();
      delete this.cronMap[i];
    }
  }
};

Sequencer.prototype.jim = null;
Sequencer.prototype.cronMap = null;

/***
*    _________                            ____.     ___.
*    \_   ___ \_______  ____   ____      |    | ____\_ |__
*    /    \  \/\_  __ \/  _ \ /    \     |    |/  _ \| __ \
*    \     \____|  | \(  <_> )   |  \/\__|    (  <_> ) \_\ \
*     \______  /|__|   \____/|___|  /\________|\____/|___  /
*            \/                   \/                     \/
*/
function CronJob(responder, labelOrName, delay, note, stopCount)
{
  this.responder = responder;
  this.labelOrName = labelOrName;
  this.delay = delay;
  this.note = note;
  this.stopCount = stopCount || -1;
  this.counter = 0;
}

CronJob.prototype.start = function()
{
  this.isRunning = true;
  this.id = setInterval((function(self) {
    return function() {
      self.tick();
    }
  })(this), this.delay );
};

CronJob.prototype.tick = function()
{
  if (this.stopCount < 0)
  {
    this.responder.cronExec(this.note);
    return;
  }
  this.counter++;
  this.responder.cronExec(this.note);

  if (this.counter == this.stopCount)
  clearInterval(this.id);

  if (this.counter == Number.MAX_VALUE)
  this.counter = 0;
};

CronJob.prototype.stop = function()
{
  this.counter = 0;
  clearInterval(this.id);
  this.isRunning = false;
};

CronJob.prototype.destroy = function()
{
  this.stop();
  this.responder = null;
  this.labelOrName = null;
  this.delay = 0;
  this.note = null;
  this.stopCount = 0;
  this.counter = 0;
};

CronJob.prototype.id = null;
CronJob.prototype.note = null;
CronJob.prototype.counter = null;
CronJob.prototype.responder = null;
CronJob.prototype.delay = null;
CronJob.prototype.stopCount = null;
CronJob.prototype.labelOrName = null;
CronJob.prototype.isRunning = false;

/***
*    _________                __                .__  .__
*    \_   ___ \  ____   _____/  |________  ____ |  | |  |   ___________
*    /    \  \/ /  _ \ /    \   __\_  __ \/  _ \|  | |  | _/ __ \_  __ \
*    \     \___(  <_> )   |  \  |  |  | \(  <_> )  |_|  |_\  ___/|  | \/
*     \______  /\____/|___|  /__|  |__|   \____/|____/____/\___  >__|
*            \/            \/                                  \/
*/
function Controller( )
{
  this.tasksMap = {};
  this.servicesMap = {};
  this.observersMap = [];
  this.factoriesMap = {};
  this.stackMode = false;
  this.stack = [];
  this.processor = new Processor();
  this.sequencer = new Sequencer();
}

Controller.prototype.dispatch = function(instructionName, body, type, header)
{
  this.stack.push(new Instruction(instructionName, body, type, header));
  this.flushStack();
};

Controller.prototype.flushStack = function()
{
  if (this.stack.length == 0)
  return;

  if (this.isStackMode)
  {
    setTimeout(this.flushStack, 300);

  } else {
    var note = this.stack.shift();
    //this.log('jim send instruction: ' + note.name);
    this.dispatchObservers(note);
    if (this.stack.length > 0)
    setTimeout(this.flushStack, 300);
  }
};

Controller.prototype.ask = function(label, body, type)
{
  if (body == null)
  body = {};
  this._exec(label, body, type);
};

Controller.prototype._exec = function(label, body, type)
{
  if (this.processor.hasProcess(label))
  {
    this.processor.execute(label, body, type);
  } else {
    this.jim.dispatch(label, body, type);
  }
};

// TASKS MANAGEMENT
Controller.prototype.executeTask = function(note)
{
  var taskClassRef = this.tasksMap[note.getName()];
  if (taskClassRef == null)
  return;

  var taskInstance = new taskClassRef(note);
  taskInstance.jim = this.jim;
  taskInstance.instruction = note;
  taskInstance.execute(note);
};

Controller.prototype.registerTask = function(instructionName, taskClassRef)
{
  if (this.tasksMap[instructionName] == null)
  {
    this.registerObserver(instructionName, new Observer(this.executeTask, this));
  }

  this.tasksMap[instructionName] = taskClassRef;
};

Controller.prototype.hasTask = function(instructionName)
{
  return this.tasksMap[instructionName] != null;
};

Controller.prototype.removeTask = function(instructionName)
{
  if (this.hasTask(instructionName))
  {
    this.removeObserver(instructionName, this);
    this.tasksMap[instructionName] = null;
  }
};

// OBSERVERS MANAGEMENT
Controller.prototype.registerObserver = function(instructionName, observer)
{
  if (this.observersMap[instructionName] != null)
  {
    this.observersMap[instructionName].push(observer);
  }
  else
  {
    this.observersMap[instructionName] = [observer];
  }
};

Controller.prototype.dispatchObservers = function(instruction)
{
  if (this.observersMap[instruction.getName()] != null)
  {
    var observers_ref = this.observersMap[instruction.getName()], observers = [], observer

    for (var i = 0; i < observers_ref.length; i++)
    {
      observer = observers_ref[i];
      observers.push(observer);
    }

    for (var i = 0; i < observers.length; i++)
    {
      observer = observers[i];
      observer.dispatchObserver(instruction);
    }
  }
};

Controller.prototype.removeObserver = function(instructionName, dispatchContext)
{
  var observers = this.observersMap[instructionName];
  for (var i = 0; i < observers.length; i++)
  {
    if (observers[i].compareDispatchContext(dispatchContext) == true)
    {
      observers.splice(i, 1);
      break;
    }
  }

  if (observers.length == 0)
  {
    delete this.observersMap[instructionName];
  }
};

// SERVICES
Controller.prototype.registerService = function(service)
{
  if (this.servicesMap[service.getServiceName()] != null)
  {
    return;
  }

  service.jim = this.jim;
  // register the service for retrieval by name
  this.servicesMap[service.getServiceName()] = service;

  // get instruction interests if any
  var interests = service.listInstructionInterests();

  // register service as an observer for each instruction
  if (interests.length > 0)
  {
    // create observer referencing this services handleInstruction method
    var observer = new Observer(service.handleInstruction, service);
    for (var i = 0; i < interests.length; i++)
    {
      this.registerObserver(interests[i], observer);
    }
  }

  service.onRegister();
};

Controller.prototype.retrieveService = function(serviceName)
{
  return this.servicesMap[serviceName];
};

Controller.prototype.removeService = function(serviceName)
{
  var service = this.servicesMap[serviceName];
  if (service)
  {
    // for every instruction the service is interested in...
    var interests = service.listInstructionInterests();
    for (var i = 0; i < interests.length; i++)
    {
      // remove the observer linking the service to the instruction
      // interest
      this.removeObserver(interests[i], service);
    }

    // remove the service from the map
    delete this.servicesMap[serviceName];

    // alert the service that it has been removed
    service.onRemove();
  }

  return service;
};

Controller.prototype.hasService = function(serviceName)
{
  return this.servicesMap[serviceName] != null;
};

// FACTORY
Controller.prototype.registerFactory = function(name, fct)
{
  if (!this.factoriesMap.hasOwnProperty(name))
  {
    this.factoriesMap[name] = fct;
  }
};

Controller.prototype.removeFactory = function(name)
{
  if ( this.registryMap.hasOwnProperty(name))
  {
    delete this.factoriesMap[name];
  }
};

Controller.prototype.retrieveFactory = function(name)
{
  return this.factoriesMap[name];
};

Controller.prototype.hasFactory = function(name)
{
  return this.factoriesMap[name] != null;
};

Controller.prototype.jim = null;
Controller.prototype.tasksMap = null;
Controller.prototype.servicesMap = null;
Controller.prototype.factoriesMap = null;
Controller.prototype.observersMap = null;
Controller.prototype.stackMode = null;
Controller.prototype.stack = null;
Controller.prototype.processor = null;
Controller.prototype.sequencer = null;

/***
*         ____.__
*        |    |__| _____
*        |    |  |/     \
*    /\__|    |  |  Y Y  \
*    \________|__|__|_|  /
*                      \/
*/
function Jim(parentProcess)
{
  this._initialize(parentProcess);
}

// STATIC
Jim.isDebug = true;

Jim.log = function(obj)
{
  if(Jim.isDebug) console.log(obj);
}

// INIT
Jim.prototype._initialize = function(parentProcess)
{
  this.controller = new Controller();

  this.controller.jim = this;
  this.controller.processor.jim = this;
  this.controller.sequencer.jim = this;

  this.bundlesMap = {};
  this.forksMap = {};
  this.registryMap = {};

  if(parentProcess)
  {
    this.parentProcess = parentProcess;
    this.parentProcess.on('message', this.handleForkMessage.bind(this))
  }
};

// MAIN FCT
Jim.prototype.dispatch = function(instructionName, body, type, header)
{
  this.log('Jim  dispatch ' + instructionName);
  this.controller.dispatch(instructionName, body, type, header);
};

Jim.prototype.ask = function(label, body, type)
{
  this.controller.ask(label, body, type);
};

Jim.prototype.askParent = function(label, body, type)
{
  if(this.parentProcess == null) return;
  this.parentProcess.send({label, body, type});
};

Jim.prototype.askFork = function(name, label, body, type)
{
  if (this.forksMap.hasOwnProperty(name))
  {
    this.forksMap[ name ].send({label, body, type});
  }
};

Jim.prototype.log = function(obj)
{
  Jim.log(obj);
};

// FORKS
Jim.prototype.handleForkMessage = function(msg)
{
  if(typeof msg === 'string') return this.ask(msg);
  if(typeof msg === 'object')
  {
    if(msg.label)
    {
      let body = msg.body || {};
      return this.ask(msg.label, body);
    }
  }

  return this.log('Jim cannot handle fork message: ' + msg);
};

Jim.prototype.registerFork = function(name, path)
{
  if (!this.forksMap.hasOwnProperty(name))
  {
    this.forksMap[ name ] = fork(path);
    this.forksMap[ name ].on('message', this.handleForkMessage.bind(this));
    this.log('Fork: ' + name + ' (child process) @ '+ path +' has been added to your Application');
  }
};

Jim.prototype.removeFork = function(name)
{
  if (this.forksMap.hasOwnProperty(name))
  {
    this.forksMap[ name ].kill();
    delete this.forksMap[ name ];
  }
};

// CRON JOB
Jim.prototype.registerCronJob = function(labelOrName, delay, note, stopCount)
{
  this.controller.sequencer.registerCronJob(labelOrName, delay, note, stopCount);
};
Jim.prototype.startCronJob = function(labelOrName)
{
  this.controller.sequencer.startCronJob(labelOrName);
};
Jim.prototype.stopCronJob = function(labelOrName, andDestroy)
{
  this.controller.sequencer.stopCronJob(labelOrName, andDestroy);
};
Jim.prototype.stopAllCronJob = function(andDestroy)
{
  this.controller.sequencer.stopAllCronJob(andDestroy);
};

// BUNDLE
Jim.prototype.registerBundle = function(name, bundleClass, configObject)
{
  if (!this.bundlesMap.hasOwnProperty(name))
  {
    this.bundlesMap[ name ] = new bundleClass(this, name, configObject);
    this.log('Bundle ' + name + ' has been added to your Application');
  }
};

Jim.prototype.removeBundle = function(name)
{
  if (this.bundlesMap.hasOwnProperty(name))
  {
    this.bundlesMap[ name ].removeBundle();
    delete this.bundlesMap[ name ];
  }
};

//PROCESSOR SHORT CUTS
Jim.prototype.registerProcess = function(processName, tasksArray)
{
  this.controller.processor.registerProcess(processName, tasksArray);
};

Jim.prototype.removeProcess = function(processName)
{
  this.controller.processor.removeProcess(processName);
};

Jim.prototype.execute = function(processName, body, type)
{
  this.controller.processor.execute(processName, body, type);
};

Jim.prototype.nextTask = function(instruction)
{
  this.controller.processor.nextTask(instruction);
};

// CONTROLLER SHORT CUTS
Jim.prototype.registerTask = function(instructionName, taskClassRef)
{
  this.controller.registerTask(instructionName, taskClassRef);
};

Jim.prototype.removeTask = function(instructionName)
{
  this.controller.removeTask(instructionName);
};

Jim.prototype.hasTask = function(instructionName)
{
  return this.controller.hasTask(instructionName);
};

// SERVICE SHORT CUTS
Jim.prototype.registerService = function(service)
{
  if (this.controller != null)
  {
    this.controller.registerService(service);
    this.log('Service ' + service.serviceName + ' has been registered');
  }
};

Jim.prototype.retrieveService = function(serviceName)
{
  return this.controller.retrieveService(serviceName);
};

Jim.prototype.removeService = function(serviceName)
{
  var service = null;
  if (this.controller != null)
  {
    service = this.controller.removeService(serviceName);
  }

  return service;
};

Jim.prototype.hasService = function(serviceName)
{
  return this.controller.hasService(serviceName);
};

// FACTORY SHORT CUTS
Jim.prototype.registerFactory = function(name)
{
  if (this.controller != null)
  {
    this.controller.registerFactory(name);
    this.log('Fcatory ' + name + ' has been registered');
  }
};

Jim.prototype.retrieveFactory = function(name)
{
  return this.controller.retrieveFactory(name);
};

Jim.prototype.removeFactory = function(name)
{
  var fct = null;
  if (this.controller != null)
  {
    fct = this.controller.removeFactory(name);
  }

  return fct;
};

Jim.prototype.hasFactory = function(name)
{
  return this.controller.hasFactory(name);
};

// REGISTRY
Jim.prototype.register = function(type, name, obj)
{
  let key = type + '.' + name;
  if (!this.registryMap.hasOwnProperty(key))
  {
    this.registryMap[key] = obj;
  }
};

Jim.prototype.remove = function(type, name)
{
  let key = type + '.' + name;
  if ( this.registryMap.hasOwnProperty(key))
  {
    delete this.registryMap[key];
  }
};

Jim.prototype.retrieve = function(type, name)
{
  let key = type + '.' + name;
  return this.registryMap[key];
};

Jim.prototype.has = function(type, name)
{
  let key = type + '.' + name;
  return this.registryMap[key] != null;
};

Jim.prototype.controller = null;
Jim.prototype.bundlesMap = null;
Jim.prototype.forksMap = null;
Jim.prototype.parentProcess = null;
Jim.prototype.registryMap = null;

/***
*                                         __
*      ____ ___  _________   ____________/  |_  ______
*    _/ __ \\  \/  /\____ \ /  _ \_  __ \   __\/  ___/
*    \  ___/ >    < |  |_> >  <_> )  | \/|  |  \___ \
*     \___  >__/\_ \|   __/ \____/|__|   |__| /____  >
*         \/      \/|__|                           \/
*/
module.exports = {
  Service,
  Task,
  Jim,
  Bundle,
  Instruction
};
